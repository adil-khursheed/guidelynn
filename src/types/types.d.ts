interface IMessage {
  chatId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  role: string;
}
