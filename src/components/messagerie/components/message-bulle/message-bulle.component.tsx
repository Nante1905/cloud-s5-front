import { CSSProperties } from "react";
import { Message } from "../../../../shared/types/Message";
import "./message-bulle.component.scss";

interface MessageBulleComponentProps {
  right?: boolean;
  id?: string;
  message: Message;
}

const MessageBulleComponent = (props: MessageBulleComponentProps) => {
  const style: CSSProperties = {
    justifyContent: props.right ? "flex-end" : "flex-start",
  };

  const renderDateEnvoie = (dateEnvoie: string) => {
    const date = new Date(dateEnvoie);
    const diff =
      Math.abs(date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);

    if (diff >= 1) {
      return (
        dateEnvoie.split("T")[0] +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    } else {
      return date.getHours() + ":" + date.getMinutes();
    }
  };

  const bulleClass = (right: boolean, status: number): string => {
    let res = "message-bulle_content";
    if (right) {
      res += " right";
    }

    if (status !== undefined) {
      switch (status) {
        case -5:
          res += " message_error";
          break;
        case 0:
          res += " message_sending";
          break;
        case 5:
          res += " message_sent";
          break;
        default:
          res += "";
          break;
      }
    }

    return res;
  };

  return (
    <div className="message-bulle" id={props.id ? props.id : ""} style={style}>
      <div className="message-bulle_image">
        {props.message && props.message.status === -5
          ? " Non envoyé"
          : renderDateEnvoie(props.message.dateEnvoi)}
      </div>
      <div
        className={bulleClass(
          props.right as boolean,
          props.message.status as number
        )}
      >
        {props.message.contenu}
      </div>
    </div>
  );
};

export default MessageBulleComponent;
