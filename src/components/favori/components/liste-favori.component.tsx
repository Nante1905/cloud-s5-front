import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import AppLoaderComponent from "../../../shared/components/loader/app-loader.component";
import { AnnonceGeneral } from "../../../shared/types/Annonce";
import AnnonceCard from "../../annonce/components/annonce-card/annonce-card.component";
import "./liste-favori.component.scss";

interface ListeFavoriProps {
  annonces: AnnonceGeneral[];
  fetchData: () => void;
  endScrolling: boolean;
}

const ListeFavori = (props: ListeFavoriProps) => {
  const navigate = useNavigate();
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
            <AnnonceCard
              key={`${annonce.reference}-${index}`}
              annonce={annonce}
              likeable
              showStatus={true}
              onClick={() => navigate(`/annonces/${annonce.id}`)}
            />
          ))}
          {props.endScrolling && props.annonces.length == 0 && (
            <p>Aucune annonce</p>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ListeFavori;
