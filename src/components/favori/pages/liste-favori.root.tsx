import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import AppLoaderComponent from "../../../shared/components/loader/app-loader.component";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../shared/components/title/title.component";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { getErrorMessage } from "../../../shared/services/api.service";
import { AnnonceGeneral } from "../../../shared/types/Annonce";
import { ApiResponse } from "../../../shared/types/api/ApiResponse";
import AnnonceCard from "../../annonce/components/annonce-card/annonce-card.component";
import { findAllFavori } from "../service/favori.service";
import "./liste-favori.root.scss";

interface ListeFavoriRootState {
  annonces: AnnonceGeneral[];
  errorMessage: string;
  openError: boolean;
  endScrolling: boolean;
  page: number;
}

const initialState: ListeFavoriRootState = {
  annonces: [],
  errorMessage: "",
  openError: false,
  endScrolling: false,
  page: 1,
};

const ListeFavoriRoot = () => {
  const [state, setState] = useState(initialState);
  const initialized = useRef(false);
  const navigate = useNavigate();

  const fetchFavori = (
    page: number = state.page,
    annonces: AnnonceGeneral[] = state.annonces
  ) => {
    console.log("fetch page ", page);

    findAllFavori(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(res);
        if (response.data.length == 0) {
          setState((state) => ({
            ...state,
            endScrolling: true,
          }));
        } else {
          console.log(state.page);

          setState((state) => ({
            ...state,
            annonces: [...annonces, ...(res.data?.data as AnnonceGeneral[])],
            page: page,
            endScrolling: response.data.length < TAILLE_PAGE,
          }));
        }
      })
      .catch((err) => {
        console.log(err);

        let errorMessage = "";
        if (err.response?.status == 403) {
          errorMessage = "Connectez vous pour voir vos favoris.";
        } else if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        setState((state) => ({
          ...state,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  };

  useEffect(() => {
    if (initialized.current == false) {
      console.log("sending requests");
      fetchFavori(1);
      setState((state) => ({
        ...state,
        page: 1,
      }));

      initialized.current = true;
    }
    window.history.scrollRestoration = "manual";
  });

  return (
    <>
      <div>
        <Title>Vos favoris</Title>
        <InfiniteScroll
          dataLength={state.annonces.length}
          next={() => fetchFavori(state.page + 1, state.annonces)}
          hasMore={true}
          scrollThreshold={0.9}
          loader={
            state.endScrolling ? (
              <p className="text-center p_end_scroll">
                Vous avez atteint la fin.
              </p>
            ) : (
              <AppLoaderComponent loading={state.endScrolling == false}>
                <></>
              </AppLoaderComponent>
            )
          }
        >
          <div className="liste-annonce">
            {state.annonces?.map((annonce, index) => (
              <AnnonceCard
                key={`${annonce.reference}-${index}`}
                annonce={annonce}
                likeable
                showStatus={true}
                onClick={() => navigate(`/annonces/${annonce.id}`)}
              />
            ))}
            {state.endScrolling && state.annonces.length == 0 && (
              <p className="text-center">Aucune annonce</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
      <ErrorSnackBar
        open={state.openError}
        onClose={() => {
          setState((state) => ({
            ...state,
            openError: false,
          }));
        }}
        error={state.errorMessage}
      />
    </>
  );
};

export default ListeFavoriRoot;
