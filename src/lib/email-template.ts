const DEFAULTS = {
  companyName: "Guidelynn",
  primaryColor: "#c96442",
  supportEmail: process.env.SMTP_USER,
};

function esc(s?: string) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Returns an object with html and text ready to use in Nodemailer
 */
export function emailTemplate(
  type: TemplateType,
  opts: BuildOptions
): { subject: string; html: string; text: string } {
  const recipientName = opts.recipientName || "";
  const actionUrl = opts.actionUrl;
  const supportEmail = opts.supportEmail || DEFAULTS.supportEmail;
  const tokenExpiryMinutes = opts.tokenExpiryMinutes || 60;
  const companyName = opts.companyName || DEFAULTS.companyName;
  const primaryColor = opts.primaryColor || DEFAULTS.primaryColor;

  // Preheader (hidden preview text)
  const preheader =
    type === "verify-email"
      ? `Verify your ${companyName} email address`
      : `Reset your ${companyName} password`;

  const subject =
    type === "verify-email"
      ? `${companyName}: Verify your email address`
      : `${companyName}: Reset your password`;

  // Friendly greeting
  const greeting =
    recipientName.trim().length > 0 ? `Hello ${esc(recipientName)},` : `Hello,`;

  // Action copy specific to the template
  const mainTitle =
    type === "verify-email"
      ? `Verify your email address`
      : `Reset your password`;

  const bodyMain =
    type === "verify-email"
      ? `Thanks for creating an account with ${companyName}! Click the button below to verify your email address and activate your account.`
      : `We received a request to reset the password for your ${companyName} account. Click the button below to set a new password. If you didn't request this, you can safely ignore this email.`;

  const expiryText = tokenExpiryMinutes
    ? ` This link will expire in ${tokenExpiryMinutes} minutes.`
    : "";

  // Fallback (plain link)
  const fallback = `If the button doesn't work, copy and paste the following link into your browser:\n${actionUrl}`;

  // Inline CSS — kept simple and widely supported
  const html = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${esc(subject)}</title>
      <style>
        /* Client-friendly resets */
        body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
        table,td { mso-table-rspace:0pt; mso-table-lspace:0pt; }
        img { -ms-interpolation-mode:bicubic; display:block; border:0; outline:none; text-decoration:none; }
        a { color: inherit; text-decoration: none; }
        /* Responsive */
        @media screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 12px !important; }
          .content { padding: 16px !important; }
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f6; font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';">
      <!-- Preheader : hidden but shown in preview -->
      <div style="display:none; max-height:0px; overflow:hidden; color:transparent; line-height:1px; max-width:0px; opacity:0;">
        ${esc(preheader)}
      </div>
  
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding: 24px 12px;">
            <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px; max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
              <!-- Header -->
              <tr>
                <td style="background:${primaryColor}; padding:20px 24px; text-align:left;">
                  <h1 style="margin:0; font-size:20px; color:#ffffff; font-weight:700;">${esc(
                    companyName
                  )}</h1>
                </td>
              </tr>
  
              <!-- Content -->
              <tr>
                <td class="content" style="padding:24px;">
                  <p style="margin:0 0 16px 0; font-size:16px; color:#111827;">${greeting}</p>
  
                  <h2 style="margin:0 0 12px 0; font-size:18px; color:#0f172a;">${esc(
                    mainTitle
                  )}</h2>
  
                  <p style="margin:0 0 20px 0; font-size:15px; color:#374151; line-height:1.45;">
                    ${esc(bodyMain)}${esc(expiryText)}
                  </p>
  
                  <!-- CTA -->
                  <table cellpadding="0" cellspacing="0" role="presentation" style="margin:18px 0;">
                    <tr>
                      <td align="center">
                        <a href="${esc(
                          actionUrl
                        )}" target="_blank" rel="noopener" style="display:inline-block; padding:12px 22px; font-size:15px; font-weight:600; border-radius:8px; background:${primaryColor}; color:#ffffff; text-decoration:none;">
                          ${
                            type === "verify-email"
                              ? "Verify Email"
                              : "Reset Password"
                          }
                        </a>
                      </td>
                    </tr>
                  </table>
  
                  <!-- Fallback link -->
                  <p style="margin:18px 0 0 0; font-size:13px; color:#6b7280;">
                    ${esc(
                      type === "verify-email"
                        ? `Can't click the button?`
                        : `Can't click the button?`
                    )} ${esc(fallback)}
                  </p>
  
                  <hr style="border:none; border-top:1px solid #e6e7eb; margin:22px 0;" />
  
                  <p style="margin:0; font-size:13px; color:#6b7280; line-height:1.4;">
                    If you have questions, reply to this email or contact us at
                    <a href="mailto:${esc(
                      supportEmail
                    )}" style="color:${primaryColor}; text-decoration:underline;">${esc(
    supportEmail
  )}</a>.
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td style="background:#fafafa; padding:16px 24px; text-align:center;">
                  <p style="margin:0; font-size:12px; color:#9ca3af;">&copy; ${new Date().getFullYear()} ${esc(
    companyName
  )}. All rights reserved.</p>
                </td>
              </tr>
            </table>
  
            <!-- Small note for mobile spacing -->
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px; max-width:600px; margin-top:10px;">
              <tr>
                <td style="text-align:center; font-size:12px; color:#9ca3af;">
                  Sent by ${esc(companyName)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `.trim();

  const text = [
    preheader,
    "",
    greeting,
    "",
    mainTitle,
    "",
    bodyMain +
      (tokenExpiryMinutes
        ? ` This link will expire in ${tokenExpiryMinutes} minutes.`
        : ""),
    "",
    `Open this link: ${actionUrl}`,
    "",
    `If you did not request this, you can ignore this email.`,
    "",
    `Support: ${supportEmail}`,
    "",
    `— ${companyName}`,
  ].join("\n");

  return { subject, html, text };
}
