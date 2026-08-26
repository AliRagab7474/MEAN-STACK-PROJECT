export interface Message {
  _id: string;
  content: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
}

export interface SendMessagePayload {
  content: string;
}