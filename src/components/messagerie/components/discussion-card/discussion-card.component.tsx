import { Discussion } from "../../../../shared/types/Discussion";
import "./discussion-card.component.scss";

interface DiscussionCardComponentProps {
  width?: number | string;
  heigth?: number | string;
  discussion: Discussion;
}

const DiscussionCardComponent = (props: DiscussionCardComponentProps) => {
  const containerStyle = {
    width: props.width ? props.width : "initial",
    height: props.heigth ? props.heigth : "initial",
  };

  return (
    <div className="discussion-card" style={containerStyle}>
      <div className="discussion-card_image">
        <img src="https://picsum.photos/200/300" alt="photo de profil" />
      </div>
      <div className="discussion-card_content">
        <div className="discussion-card_title">
          <h3>Rakoto Jean</h3>
        </div>
        <div className="message-preview">
          <p>Cette article est-il toujours disponible</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCardComponent;
