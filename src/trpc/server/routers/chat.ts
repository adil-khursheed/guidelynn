import { prisma } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_API_URL,
    "X-Title": "Guidelynn",
  },
});

export const chatRouter = createTRPCRouter({
  createNewChat: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      console.log({ userId });

      const newChat = await prisma.chat.create({
        data: { userId, title: input.title },
      });

      return newChat;
    }),
});
