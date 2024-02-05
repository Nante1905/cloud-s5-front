import { Message } from "./Message";
import { Utilisateur } from "./Utilisateur";

export interface Discussion {
  id: string;
  userId1: number;
  userId2: number;
  gauche: Utilisateur;
  droite: Utilisateur;
  lastMessage: Message;

  newMessage?: boolean;
}
