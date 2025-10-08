import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { emailTemplate } from "@/lib/email-template";
import { transport } from "@/lib/nodemailer";

async function handler(req: NextRequest) {
  try {
    console.log("🔔 API route hit at:", new Date().toISOString());

    const body = await req.json();
    console.log("📧 Email data received:", body);

    const { html, subject, text } = emailTemplate(body.type, {
      actionUrl: body.actionUrl,
      recipientName: body.recipientName,
    });

    await transport.sendMail({
      from: `"Guidelynn" <${process.env.SMTP_USER}>`,
      to: body.to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent successfully:");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const POST = verifySignatureAppRouter(handler);
