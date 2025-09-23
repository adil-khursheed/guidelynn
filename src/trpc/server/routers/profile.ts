import { createTRPCRouter, protectedProcedure } from "../init";
import { ProfileFormSchema } from "@/schemas/profile-schema";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userProfile = await ctx.prisma.userProfile.findUnique({
      where: { userId: ctx.user.id },
    });

    return userProfile;
  }),

  update: protectedProcedure
    .input(ProfileFormSchema)
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
