export interface Message {
  messageId: string;
  expediteurId: number;
  destinataireId: number;
  contenu: string;
  dateEnvoi: string;
  type: number;
}
