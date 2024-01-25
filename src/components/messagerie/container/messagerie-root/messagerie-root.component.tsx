import { useEffect } from "react";
import DiscussionListComponent from "../../components/discussion-list/discussion.component";
import MessageInputComponent from "../../components/message-input/message-input.component";
import MessageContainerRoot from "../message-container/message-container-root.component";
import "./messagerie-root.component.scss";

const MessagerieRoot = () => {
  const container = document.getElementById("bottom");
  useEffect(() => {
    container?.scrollIntoView({ behavior: "smooth" });
  }, [container]);

  return (
    <div className="messagerie-root">
      <DiscussionListComponent />

      <div className="messagerie-root_messages-container">
        <MessageContainerRoot />
      </div>
      <div className="messagerie-root_input-container">
        <MessageInputComponent />
      </div>
    </div>
  );
};

export default MessagerieRoot;
