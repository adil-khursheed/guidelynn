import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { addMemory, searchMemories } from "@/lib/mem0";

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_API_URL,
    "X-Title": "Guidelynn",
  },
});

export const chatRouter = createTRPCRouter({
  getChats: protectedProcedure.query(async ({ ctx }) => {
    const chats = await ctx.prisma.chat.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return chats;
  }),

  getChatById: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { chatId } = input;
      const chat = await ctx.prisma.chat.findFirst({
        where: {
          id: chatId,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat not found",
        });
      }

      return chat;
    }),

  createNewChat: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        id: z.uuidv4(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      const newChat = await ctx.prisma.chat.create({
        data: {
          userId,
          title: input.title,
          id: input.id,
        },
      });

      return newChat;
    }),

  sendNewMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.uuid(),
        message: z.string().min(1),
        messageId: z.uuidv4(),
      })
    )
    .mutation(async function* ({ ctx, input }) {
      const userId = ctx.user.id;

      const { message, chatId, messageId } = input;

      if (!message || !chatId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Message and chatId are required",
        });
      }

      await ctx.prisma.message.create({
        data: {
          role: "user",
          message,
          chatId,
          id: messageId,
        },
      });

      const userProfile = await ctx.prisma.userProfile.findUnique({
        where: {
          userId,
        },
      });

      const relevantMemories = await searchMemories(userId, message);

      const existingMessages = await ctx.prisma.message.findMany({
        where: { chatId },
        orderBy: {
          createdAt: "asc",
        },
        take: 10,
      });

      const systemPrompt = `You are an expert AI career counselor, Guidelynn. Your role is to provide personalized career guidance, help with job search strategies, interview preparation, skill development recommendations, and career planning.

      Current user profile:
      - Current Role: ${userProfile?.currentRole || "Not specified"}
      - Experience: ${userProfile?.experience || "0"} years
      - Industry: ${userProfile?.industry || "Not specified"}
      - Skills: ${userProfile?.skills?.join(", ") || "Not specified"}
      - Interests: ${userProfile?.interests?.join(", ") || "Not specified"}
      - Career Stage: ${userProfile?.careerStage || "Not specified"}

      Relevant past context:
      ${relevantMemories.map((m) => `- ${m.memory}`).join("\n")}

      Provide helpful, actionable advice while being supportive and encouraging.`;

      const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...existingMessages.slice(-8).map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.message,
          })),
        ],
        stream: true,
        temperature: 0.7,
        max_completion_tokens: 1024,
      });

      let aiResponse = "";
      for await (const chunk of response) {
        const targetIndex = 0;
        const target = chunk.choices[targetIndex];
        const content = target?.delta?.content ?? "";
        yield content;

        aiResponse += content;
      }

      const saveAIMessage = await ctx.prisma.message.create({
        data: {
          chatId,
          role: "assistant",
          message: aiResponse,
        },
      });

      await addMemory(userId, [
        {
          role: "user",
          content: message,
        },
        {
          role: "assistant",
          content: aiResponse,
        },
      ]);

      return saveAIMessage;
    }),
});
