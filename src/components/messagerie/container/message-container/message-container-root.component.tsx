import { Button } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import decodeToken from "../../../../shared/helpers/auth.helper";
import { Message } from "../../../../shared/types/Message";
import MessageBulleComponent from "../../components/message-bulle/message-bulle.component";
import MessageInputComponent from "../../components/message-input/message-input.component";
import "./message-container-root.component.scss";

interface MessageContainerRootProps {
  messages: Message[];
  chatId: string;
  headName: string;
  loading?: boolean;
  loadingMore?: boolean;
  scroll?: boolean;
  send: (message: string, chatId: string) => void;
  loadMore: () => void;
}

const MessageContainerRoot = (props: MessageContainerRootProps) => {
  const idUser = useMemo(() => {
    return decodeToken()?.id;
  }, []);
  const messages = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.current) {
      end.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.scroll]);

  return (
    <div className="message-container-root">
      <AppLoaderComponent loading={props?.loading as boolean}>
        <>
          <div className="message-container-root_header">
            <h2>{props?.headName}</h2>
          </div>
          <div className="messages" ref={messages}>
            {props.messages.length > 0 ? (
              <div className="btn">
                <AppLoaderComponent loading={props?.loadingMore as boolean}>
                  <Button
                    variant="outlined"
                    onClick={(_event) => {
                      props.loadMore();
                    }}
                  >
                    Voir plus
                  </Button>
                </AppLoaderComponent>
              </div>
            ) : (
              <></>
            )}
            {props.messages
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
            props.send(message, props.chatId);
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
