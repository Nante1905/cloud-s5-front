import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import { Discussion } from "../../../../shared/types/Discussion";
import DiscussionCardComponent from "../discussion-card/discussion-card.component";
import "./discussion.component.scss";

interface DiscussionListComponentProps {
  discussions: Discussion[];
  loading?: boolean;
  onDiscussionChange: (id: string, discussionName: string) => void;
}

const DiscussionListComponent = (props: DiscussionListComponentProps) => {
  return (
    <div className="discussion-list">
      <div className="discussion-list_header">
        <div className="discussion-list_header_title">
          <h2>Messagerie</h2>
        </div>
      </div>
      <AppLoaderComponent loading={props?.loading as boolean}>
        <div className="discussion-list_body">
          {props.discussions?.map((discussion, index) => (
            <DiscussionCardComponent
              key={index}
              discussion={discussion}
              onClick={(_event, id) =>
                props.onDiscussionChange(
                  id,
                  discussion.gauche.prenom + " " + discussion.gauche.nom
                )
              }
            />
          ))}
        </div>
      </AppLoaderComponent>
    </div>
  );
};

export default DiscussionListComponent;
