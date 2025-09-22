import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userProfile = await ctx.prisma.userProfile.findUnique({
      where: { userId: ctx.user.id },
    });

    return userProfile;
  }),

  update: protectedProcedure
    .input(
      z.object({
        currentRole: z.string().optional(),
        experience: z.number().optional(),
        industry: z.string().optional(),
        skills: z.array(z.string()).optional(),
        interests: z.array(z.string()).optional(),
        education: z.string().optional(),
        location: z.string().optional(),
        careerStage: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userProfile = await ctx.prisma.userProfile.upsert({
        where: { userId: ctx.user.id },
        create: {
          userId: ctx.user.id,
          ...input,
        },
        update: input,
      });

      return userProfile;
    }),
});
