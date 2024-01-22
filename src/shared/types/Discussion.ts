import { Message } from "./Message";

export interface Discussion {
  idDiscussion: string;
  userId1: number;
  userId2: number;
  messages: Message[];
}
