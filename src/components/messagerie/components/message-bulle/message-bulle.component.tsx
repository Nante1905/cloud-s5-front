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

  return (
    <div className="message-bulle" id={props.id ? props.id : ""} style={style}>
      <div className="message-bulle_image">22:00</div>
      <div
        className={
          props.right ? "message-bulle_content right" : "message-bulle_content"
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est quam
        ratione illum ad omnis, ipsa harum dicta laboriosam totam adipisci
        praesentium, labore nam ea. Fuga mollitia nam laudantium distinctio hic
        cum, quaerat quis temporibus aut consequatur nesciunt voluptates quae
        dolores eum accusamus neque libero minus veritatis recusandae culpa
        excepturi perspiciatis nemo velit? Voluptatibus recusandae ab pariatur,
        dignissimos fugit sed cupiditate culpa. Ut alias ipsa rerum omnis quo
        cum, harum sed aspernatur porro a cumque perferendis, minus dolorum
        ipsam? Tempora.
      </div>
    </div>
  );
};

export default MessageBulleComponent;
