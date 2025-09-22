import { createTRPCRouter } from "../init";
import { chatRouter } from "./chat";
import { profileRouter } from "./profile";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
