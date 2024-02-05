import { useCallback, useEffect, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import decodeToken from "../../../../shared/helpers/auth.helper";
import { Discussion } from "../../../../shared/types/Discussion";
import { Message } from "../../../../shared/types/Message";
import { socket } from "../../../../socket";
import DiscussionListComponent from "../../components/discussion-list/discussion.component";
import {
  findAllDiscussions,
  findMessageOf,
} from "../../service/messagerie.service";
import MessageContainerRoot from "../message-container/message-container-root.component";
import "./messagerie-root.component.scss";

const MessagerieRoot = () => {
  const [state, setState] = useState(initialState);

  const container = document.getElementById("bottom");
  useEffect(() => {
    container?.scrollIntoView({ behavior: "smooth" });
  }, [container]);

  useEffect(() => {
    findAllDiscussions()
      .then((res) => {
        console.log(res);

        setState((state) => ({
          ...state,
          discussions: res.data.data,
          discussionLoading: false,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          discussionErr: err.response ? err.response.data.err : err.message,
          discussionLoading: false,
        }));
        console.log(err);
      });

    socket.on("new_message", (data) => {
      const newMessage: Message = {
        messageId: "",
        expediteurId: Number(data.idExpedit),
        destinataireId: 0,
        contenu: data.message,
        dateEnvoi: new Date().toISOString(),
        type: 0,
      };
      setState((state) => ({
        ...state,
        discussions: state.discussions.map((d) => {
          if (d.id == data.discussionId) {
            d.lastMessage = newMessage;
            d.newMessage = true;
          }
          return d;
        }),
      }));
    });
    return () => {
      socket.off("new_message");
    };
  }, []);

  useEffect(() => {
    socket.on(
      "message_received",
      (data: { message: string; discussionId: string; idExpedit: string }) => {
        console.log(data);
        console.log("curent", state.currentChat);

        if (data.discussionId === state.currentChat) {
          console.log("message_received");
          const newMessage: Message = {
            messageId: "",
            expediteurId: Number(data.idExpedit),
            destinataireId: 0,
            contenu: data.message,
            dateEnvoi: new Date().toISOString(),
            type: 0,
          };
          setState((state) => ({
            ...state,
            messages: [newMessage, ...state.messages],
            scrollMessages: !state.scrollMessages,
          }));
        }
      }
    );
    return () => {
      socket.off("message_received");
    };
  }, [state.currentChat]);

  const handleSendMessage = (message: string, chatId: string) => {
    if (chatId === "") {
      throw Error("Cannot send empty");
    }
    const newMessage: Message = {
      messageId: "",
      expediteurId: decodeToken().id,
      destinataireId: 0,
      contenu: message,
      dateEnvoi: new Date().toISOString(),
      type: 0,
      status: 0,
    };
    console.log(message, chatId);
    setState((state) => ({
      ...state,
      messages: [newMessage, ...state.messages],
      discussions: state.discussions.map((d) => {
        if (d.id == chatId) {
          d.lastMessage = newMessage;
          d.newMessage = false;
        }
        return d;
      }),
      scrollMessages: !state.scrollMessages,
    }));

    // TODO: dev mode only
    setTimeout(() => {
      socket.emit("send_message", {
        message: message,
        discussionId: chatId,
        idExpedit: decodeToken().id,
      });
      setState((state) => ({
        ...state,
        messages: state.messages.map((message) => {
          if (message.status === 0) {
            message.status = 5;
          }
          return message;
        }),
        messageSent: state.messageSent + 1,
      }));
    }, 1000);

    // sendMessage(chatId, message)
    //   .then((_res) => {
    //     console.log(_res);

    //     socket.emit("send_message", {
    //       message: message,
    //       discussionId: chatId,
    //       idExpedit: decodeToken().id,
    //     });
    //     if (_res.data.ok) {
    //       setState((state) => ({
    //         ...state,
    //         messages: state.messages.map((message) => {
    //           if (message.status === 0) {
    //             message.status = 5;
    //           }
    //           return message;
    //         }),
    //       }));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setState((state) => ({
    //       ...state,
    //       messages: state.messages.map((message) => {
    //         if (message.status === 0) {
    //           message.status = -5;
    //         }
    //         return message;
    //       }),
    //     }));
    //   });
  };

  const handleDiscussionChange = useCallback(
    (id: string, discussionName: string) => {
      setState((state) => ({
        ...state,
        messagesLoading: true,
        discussions: state.discussions.map((d) => {
          if (d.id == id) {
            d.newMessage = false;
          }
          return d;
        }),
        messagesPage: 1,
        messageSent: 0,
      }));
      findMessageOf(id, 1, 10, 0)
        .then((res) => {
          socket.emit("join_chat", {
            chatId: id,
          });
          setState((state) => ({
            ...state,
            messages: res.data.data,
            messagesLoading: false,
            displayConv: discussionName,
            currentChat: id,
            scrollMessages: !state.scrollMessages,
          }));
          console.log(res);
        })
        .catch((err) =>
          setState((state) => ({
            ...state,
            messages: err.response.data.err,
            messagesLoading: false,
          }))
        );
    },
    []
  );

  const loadMore = () => {
    setState((state) => ({
      ...state,
      loadingMore: true,
    }));
    findMessageOf(
      state.currentChat,
      state.messagesPage + 1,
      10,
      state.messageSent
    )
      .then((res) => {
        console.log(res);
        setState((state) => ({
          ...state,
          messages: [...state.messages, ...res.data.data],
          messagesPage: state.messagesPage + 1,
          loadingMore: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        setState((state) => ({
          ...state,
          messages: err.response.err,
          messagesLoading: false,
          loadingMore: false,
        }));
      });
  };

  return (
    <div className="messagerie-root">
      <DiscussionListComponent
        discussions={state.discussions}
        loading={state.discussionLoading}
        onDiscussionChange={(id, discussionName) =>
          handleDiscussionChange(id, discussionName)
        }
      />

      <div className="messagerie-root_messages-container">
        <MessageContainerRoot
          loadMore={loadMore}
          loadingMore={state.loadingMore}
          send={(message, chatId) => handleSendMessage(message, chatId)}
          chatId={state.currentChat}
          messages={state.messages}
          loading={state.messagesLoading}
          headName={state.displayConv}
          scroll={state.scrollMessages}
        />
      </div>
      <ErrorSnackBar
        open={state.discussionErr !== ""}
        onClose={() => {
          setState((state) => ({
            ...state,
            discussionErr: "",
          }));
        }}
        error={state.discussionErr}
      />
      <ErrorSnackBar
        open={state.sendMessageError !== ""}
        onClose={() => {
          setState((state) => ({
            ...state,
            sendMessageError: "",
          }));
        }}
        error={state.sendMessageError}
      />
    </div>
  );
};

export default MessagerieRoot;

interface MessagerieRootState {
  discussions: Discussion[];
  discussionLoading: boolean;
  discussionErr: string;
  messages: Message[];
  messagesLoading: boolean;
  messagesError: string;
  displayConv: string;
  currentChat: string;
  sendMessageError: string;
  messageSent: number;
  messagesPage: number;
  loadingMore: boolean;
  scrollMessages: boolean;
}

const initialState: MessagerieRootState = {
  discussions: [],
  discussionErr: "",
  discussionLoading: true,
  messages: [],
  messagesLoading: false,
  messagesError: "",
  displayConv: "",
  currentChat: "",
  sendMessageError: "",
  messageSent: 0,
  messagesPage: 1,
  loadingMore: false,
  scrollMessages: false,
};
