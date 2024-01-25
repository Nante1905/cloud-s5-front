import { useRef } from "react";
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

  const discussionCard = useRef<HTMLDivElement>(null);

  return (
    <div
      className="discussion-card"
      style={containerStyle}
      ref={discussionCard}
      onFocus={() => {
        discussionCard?.current?.classList?.toggle("active");
      }}
    >
      <div className="discussion-card_content">
        <div className="discussion-card_title">
          <h3>
            {props.discussion?.droite.prenom +
              " " +
              props.discussion?.droite.nom}
          </h3>
        </div>
        <div className="message-preview">
          <p>Cette article est-il toujours disponible</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCardComponent;
