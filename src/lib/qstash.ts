import { Client } from "@upstash/qstash";

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export const sendMailInQueue = async (options: {
  to: string;
  recipientName: string;
  actionUrl: string;
  type: TemplateType;
}) => {
  await qstashClient.publishJSON({
    url: `${process.env.NEXT_PUBLIC_EXPOSED_URL}/api/send-mail`,
    body: options,
  });
};
