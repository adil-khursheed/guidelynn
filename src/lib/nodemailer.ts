import nodemailer from "nodemailer";
import { emailTemplate } from "./email-template";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (options: {
  to: string;
  recipientName: string;
  actionUrl: string;
  type: TemplateType;
}) => {
  try {
    const { html, subject, text } = emailTemplate(options.type, {
      actionUrl: options.actionUrl,
      recipientName: options.recipientName,
    });

    await transport.sendMail({
      from: `"Guidelynn" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.log("Email sending failed: ", error);
  }
};
