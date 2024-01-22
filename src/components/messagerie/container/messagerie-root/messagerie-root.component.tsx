import { useEffect } from "react";
import DiscussionListComponent from "../../components/discussion-list/discussion.component";
import MessageBulleComponent from "../../components/message-bulle/message-bulle.component";
import "./messagerie-root.component.scss";

const MessagerieRoot = () => {
  window.history.scrollRestoration = "manual";
  useEffect(() => {
    const lastMessage = document.getElementById("bottom");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="messagerie-root">
      <DiscussionListComponent />
      <div className="messagerie-root_messages-container">
        <MessageBulleComponent />
        <MessageBulleComponent />
        <MessageBulleComponent />
        <MessageBulleComponent />
        <MessageBulleComponent />
        <MessageBulleComponent />
        <div id="bottom">test</div>
      </div>
    </div>
  );
};

export default MessagerieRoot;
