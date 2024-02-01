import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import AnnonceCard from "../annonce-card/annonce-card.component";
import "./liste-annonce.component.scss";

interface ListeAnnonceProps {
  annonces: AnnonceGeneral[];
  fetchData: () => void;
  endScrolling: boolean;
}

const ListeAnnonce = (props: ListeAnnonceProps) => {
  return (
    <>
      <InfiniteScroll
        dataLength={props.annonces.length}
        next={props.fetchData}
        hasMore={true}
        scrollThreshold={0.9}
        loader={
          props.endScrolling ? (
            <p className="text-center p_end_scroll">
              Vous avez atteint la fin.
            </p>
          ) : (
            <AppLoaderComponent loading={props.endScrolling == false}>
              <></>
            </AppLoaderComponent>
          )
        }
      >
        <div className="liste-annonce">
          {props.annonces?.map((annonce, index) => (
            <Link to={`${annonce.id}`} key={`${annonce.reference}-${index}`}>
              <AnnonceCard annonce={annonce} likeable showStatus={false} />
            </Link>
          ))}
          {props.endScrolling && props.annonces.length == 0 && (
            <p>Aucune annonce</p>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ListeAnnonce;
