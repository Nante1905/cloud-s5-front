import DiscussionCardComponent from "../discussion-card/discussion-card.component";
import "./discussion.component.scss";

const DiscussionListComponent = () => {
  return (
    <div className="discussion-list">
      <div className="discussion-list_header">
        <div className="discussion-list_header_title">
          <h2>Messagerie</h2>
        </div>
      </div>
      <div className="discussion-list_body">
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
        <DiscussionCardComponent />
      </div>
    </div>
  );
};

export default DiscussionListComponent;
