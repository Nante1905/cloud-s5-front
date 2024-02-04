import { useMemo, useRef } from "react";
import decodeToken from "../../../../shared/helpers/auth.helper";
import { Discussion } from "../../../../shared/types/Discussion";
import "./discussion-card.component.scss";

interface DiscussionCardComponentProps {
  width?: number | string;
  heigth?: number | string;
  discussion: Discussion;
  onClick?: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
}

const DiscussionCardComponent = (props: DiscussionCardComponentProps) => {
  const containerStyle = {
    width: props.width ? props.width : "initial",
    height: props.heigth ? props.heigth : "initial",
  };

  const token = useMemo(() => {
    return decodeToken();
  }, []);

  const discussionCard = useRef<HTMLDivElement>(null);

  return (
    <div
      className="discussion-card"
      style={containerStyle}
      ref={discussionCard}
      onFocus={() => {
        discussionCard?.current?.classList?.toggle("active");
      }}
      onClick={(event) =>
        props.onClick ? props?.onClick(event, props.discussion.id) : () => {}
      }
    >
      <div className="discussion-card_content">
        <div className="discussion-card_title">
          <h3>
            {props.discussion?.gauche.prenom +
              " " +
              props.discussion?.gauche.nom}
          </h3>
        </div>
        <div className="message-preview">
          <p>{props.discussion.lastMessage.contenu}</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCardComponent;
