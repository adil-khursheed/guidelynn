import { transport } from "@/lib/nodemailer";
import { baseProcedure, createTRPCRouter } from "../init";
import { z } from "zod";
import { emailTemplate } from "@/lib/email-template";

export const mailRouter = createTRPCRouter({
  send: baseProcedure
    .input(
      z.object({
        to: z.email().min(1, "Email is required"),
        recipientName: z.string().min(1, "Recipient name is required"),
        actionUrl: z.url().min(1, "Action url is required"),
        type: z.enum(["verify-email", "reset-password"]),
      })
    )
    .mutation(async ({ input }) => {
      const { to, recipientName, actionUrl, type } = input;
      try {
        const { html, subject, text } = emailTemplate(type, {
          actionUrl: actionUrl,
          recipientName: recipientName,
        });

        await transport.sendMail({
          from: `"Guidelynn" <${process.env.SMTP_USER}>`,
          to,
          subject,
          html,
          text,
        });
      } catch (error) {
        console.log("Email sending failed: ", error);
      }
    }),
});
