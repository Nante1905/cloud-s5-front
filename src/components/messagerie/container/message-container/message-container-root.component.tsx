import { useEffect, useMemo, useRef, useState } from "react";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import decodeToken from "../../../../shared/helpers/auth.helper";
import { Message } from "../../../../shared/types/Message";
import { socket } from "../../../../socket";
import MessageBulleComponent from "../../components/message-bulle/message-bulle.component";
import MessageInputComponent from "../../components/message-input/message-input.component";
import { sendMessage } from "../../service/messagerie.service";
import "./message-container-root.component.scss";

interface MessageContainerRootProps {
  messages: Message[];
  chatId: string;
  headName: string;
  loading?: boolean;
}

const MessageContainerRoot = (props: MessageContainerRootProps) => {
  const idUser = useMemo(() => {
    return decodeToken().id;
  }, []);
  const messages = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<MessageContainerRootState>({
    ...initialState,
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      messages: props.messages,
    }));
  }, [props]);

  useEffect(() => {
    if (messages.current) {
      end.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  useEffect(() => {
    socket.on(
      "message_received",
      (data: { message: string; discussionId: string; idExpedit: string }) => {
        console.log(data);
        console.log("curent", props.chatId);

        if (data.discussionId == props.chatId) {
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
          }));
        }
      }
    );
    return () => {
      socket.off("message_received");
    };
  }, [props.chatId]);

  const handleSendMessage = (message: string, chatId: string) => {
    if (chatId === "") {
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
    }));

    // TODO: dev mode only
    // setTimeout(() => {
    //   socket.emit("send_message", {
    //     message: message,
    //     discussionId: chatId,
    //     idExpedit: decodeToken().id,
    //   });
    //   setState((state) => ({
    //     ...state,
    //     messages: state.messages.map((message) => {
    //       if (message.status === 0) {
    //         message.status = 5;
    //       }
    //       return message;
    //     }),
    //   }));
    // }, 1000);

    sendMessage(chatId, message)
      .then((_res) => {
        console.log(_res);

        socket.emit("send_message", {
          message: message,
          discussionId: chatId,
          idExpedit: decodeToken().id,
        });
        if (_res.data.ok) {
          setState((state) => ({
            ...state,
            messages: state.messages.map((message) => {
              if (message.status === 0) {
                message.status = 5;
              }
              return message;
            }),
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setState((state) => ({
          ...state,
          messages: state.messages.map((message) => {
            if (message.status === 0) {
              message.status = -5;
            }
            return message;
          }),
        }));
      });
  };

  return (
    <div className="message-container-root">
      <AppLoaderComponent loading={props?.loading as boolean}>
        <>
          <div className="message-container-root_header">
            <h2>{props?.headName}</h2>
          </div>
          <div className="messages" ref={messages}>
            {state.messages
              ?.slice()
              .reverse()
              .map((message, index) => (
                <MessageBulleComponent
                  key={index}
                  message={message}
                  right={message.expediteurId === idUser}
                />
              ))}
            <div className="anchor" ref={end}></div>
          </div>
        </>
      </AppLoaderComponent>
      <div className="messagerie-root_input-container">
        <MessageInputComponent
          chatId={props.chatId}
          onSend={(message) => {
            console.log(message, props.chatId);
            handleSendMessage(message, props.chatId);
          }}
        />
      </div>
      {/* <MessageBulleComponent />
      <MessageBulleComponent />
      <MessageBulleComponent right />
      <MessageBulleComponent />
      <MessageBulleComponent right /> */}
    </div>
  );
};

export default MessageContainerRoot;

interface MessageContainerRootState {
  messages: Message[];
}

const initialState: MessageContainerRootState = {
  messages: [],
};
