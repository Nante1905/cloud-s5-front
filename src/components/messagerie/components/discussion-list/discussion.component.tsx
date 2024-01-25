import { Discussion } from "../../../../shared/types/Discussion";
import DiscussionCardComponent from "../discussion-card/discussion-card.component";
import "./discussion.component.scss";

interface DiscussionListComponentProps {
  discussions: Discussion[];
}

const DiscussionListComponent = (props: DiscussionListComponentProps) => {
  return (
    <div className="discussion-list">
      <div className="discussion-list_header">
        <div className="discussion-list_header_title">
          <h2>Messagerie</h2>
        </div>
      </div>
      <div className="discussion-list_body">
        {props.discussions?.map((discussion, index) => (
          <DiscussionCardComponent key={index} discussion={discussion} />
        ))}
        <DiscussionCardComponent />
        <DiscussionCardComponent />
      </div>
    </div>
  );
};

export default DiscussionListComponent;
