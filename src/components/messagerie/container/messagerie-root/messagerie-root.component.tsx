import { useCallback, useEffect, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
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
  }, []);

  const handleDiscussionChange = useCallback(
    (id: string, discussionName: string) => {
      setState((state) => ({
        ...state,
        messagesLoading: true,
      }));
      findMessageOf(id, 1, 10)
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
          }));
          console.log(res);
        })
        .catch((err) =>
          setState((state) => ({
            ...state,
            messages: err.response.err,
            messagesLoading: false,
          }))
        );
    },
    []
  );

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
          chatId={state.currentChat}
          messages={state.messages}
          loading={state.messagesLoading}
          headName={state.displayConv}
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
};
