import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { sendMailInQueue } from "./qstash";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMailInQueue({
        type: "verify-email",
        to: user.email,
        recipientName: user.name,
        actionUrl: url,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMailInQueue({
        type: "reset-password",
        to: user.email,
        recipientName: user.name,
        actionUrl: url,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookiePrefix: "_guidelynn",
  },
  plugins: [nextCookies()],
});

export const getSession = async () =>
  auth.api.getSession({
    headers: await headers(),
  });
