export interface Message {
  messageId: string;
  expediteurId: number;
  destinataireId: number;
  contenu: string;
  dateEnvoi: string;
  type: number;
  status?: number; // -5 not sent, 0 pending, 5 sent
}
