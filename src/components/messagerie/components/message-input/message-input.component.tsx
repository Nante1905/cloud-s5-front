import SendIcon from "@mui/icons-material/Send";

import { useEffect, useRef, useState } from "react";
import "./message-input.component.scss";

interface MessageInputComponentProps {
  chatId: string;
  onSend: (message: string, chatId: string) => void;
}

const MessageInputComponent = (props: MessageInputComponentProps) => {
  const [state, setState] = useState<MessageInputComponentState>();
  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (input.current !== null) {
      input.current.value = "";
    }
    setState((state) => ({
      ...state,
      message: "",
    }));
  }, [props.chatId]);

  return (
    <div className="message-input">
      <div className="message-input_container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (state?.message && state.message !== "") {
              props.onSend(state?.message as string, props.chatId);
            }
            input.current && (input.current.value = "");
          }}
          className="message-input_container_field"
          ref={form}
        >
          <div className="message-input_container">
            <input
              type="text"
              placeholder="Message"
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  message: event.target.value,
                }));
              }}
              ref={input}
            />
            <div className="message-input_container_action">
              <button
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  paddingTop: "5px",
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInputComponent;

interface MessageInputComponentState {
  message?: string;
}
