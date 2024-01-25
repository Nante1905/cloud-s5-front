import MessageBulleComponent from "../../components/message-bulle/message-bulle.component";
import "./message-container-root.component.scss";

const MessageContainerRoot = () => {
  return (
    <div className="message-container-root">
      <div className="message-container-root_header">
        <h2>Rakoto Jean</h2>
      </div>
      <MessageBulleComponent />
      <MessageBulleComponent />
      <MessageBulleComponent />
      <MessageBulleComponent right />
      <MessageBulleComponent />
      <MessageBulleComponent right />
    </div>
  );
};

export default MessageContainerRoot;
