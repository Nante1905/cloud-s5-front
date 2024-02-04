import { http } from "../../../shared/services/interceptor/axios.interceptor";

export const findAllDiscussions = () => http.get("/discussions");
export const findMessageOf = (
  id: string,
  pageNumber: number,
  pageSize: number
) =>
  http.post("/message", {
    chatId: id,
    pagination: {
      numero: pageNumber,
      taillePage: pageSize,
    },
  });

export const sendMessage = (chatId: string, message: string) =>
  http.post("/message/sendMessage", {
    discussionId: chatId,
    message,
  });
