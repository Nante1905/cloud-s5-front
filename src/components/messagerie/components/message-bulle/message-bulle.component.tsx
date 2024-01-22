import "./message-bulle.component.scss";

interface MessageBulleComponentProps {
  right?: boolean;
  id?: string;
}

const MessageBulleComponent = (props: MessageBulleComponentProps) => {
  return (
    <div className="message-bulle" id={props.id ? props.id : ""}>
      <div className="message-bulle_image">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div className="message-bulle_content">
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
