type TemplateType = "verify-email" | "reset-password";

interface BuildOptions {
  recipientName?: string; // optional: "Adil"
  actionUrl: string; // required: verification or reset link
  supportEmail?: string; // optional contact/support email shown in footer
  tokenExpiryMinutes?: number; // optional expiration info for the CTA link
  companyName?: string; // optional override of brand name
  primaryColor?: string; // optional override of primary color
}

interface IMessage {
  chatId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  role: string;
}
