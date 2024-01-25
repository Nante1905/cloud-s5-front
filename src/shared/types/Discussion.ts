import { Message } from "./Message";
import { Utilisateur } from "./Utilisateur";

export interface Discussion {
  idDiscussion: string;
  userId1: number;
  userId2: number;
  messages: Message[];
  gauche: Utilisateur;
  droite: Utilisateur;
}
