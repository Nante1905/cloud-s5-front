import SendIcon from "@mui/icons-material/Send";

import "./message-input.component.scss";

const MessageInputComponent = () => {
  return (
    <div className="message-input">
      <div className="message-input_container">
        <div className="message-input_container_field">
          <input type="text" placeholder="Message" />
        </div>
        <div className="message-input_container_action">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default MessageInputComponent;
