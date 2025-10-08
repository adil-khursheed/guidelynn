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
    url: `https://right-mayfly-vocal.ngrok-free.app/api/send-mail`,
    body: options,
  });
};
