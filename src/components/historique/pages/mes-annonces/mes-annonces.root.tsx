import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/components/title/title.component";
import { TAILLE_PAGE } from "../../../../shared/constants/constants";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import AnnonceCard from "../../../annonce/components/annonce-card/annonce-card.component";
import { findMyAnnonces } from "../../service/historique.service";

interface MesAnnoncesRootState {
  annonces: AnnonceGeneral[];
  errorMessage: string;
  openError: boolean;
  endScrolling: boolean;
  page: number;
}

const initialState: MesAnnoncesRootState = {
  annonces: [],
  errorMessage: "",
  openError: false,
  endScrolling: false,
  page: 1,
};

const MesAnnoncesRoot = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const initialized = useRef(false);

  const fetchAnnonce = (
    page: number = state.page,
    annonces: AnnonceGeneral[] = state.annonces
  ) => {
    console.log("fetch page ", page);

    findMyAnnonces(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(res);
        if (response.data.length == 0) {
          setState((state) => ({
            ...state,
            endScrolling: true,
          }));
        } else {
          setState((state) => ({
            ...state,
            annonces: [...annonces, ...(res.data?.data as AnnonceGeneral[])],
            page: page,
            endScrolling: response.data.length < TAILLE_PAGE,
          }));
        }
      })
      .catch((err) => {
        let errorMessage = "";
        if (err.response.status == 403) {
          errorMessage = "Connectez vous pour voir vos favoris.";
        } else if (
          !err.response.data.err ||
          err.response.data.err == "" ||
          err.response.data.err == null
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
    console.log("re render");

    if (initialized.current == false) {
      fetchAnnonce(1);
      initialized.current = true;
      setState((state) => ({
        ...state,
        page: 1,
      }));
    }

    window.history.scrollRestoration = "manual";
  });

  return (
    <>
      <div>
        <Title>Vos annonces</Title>

        <InfiniteScroll
          dataLength={state.annonces.length}
          next={() => fetchAnnonce(state.page + 1)}
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
                likeable={false}
                showStatus={true}
                onClick={() => navigate(`/annonces/${annonce.id}/historique`)}
              />
            ))}
            {state.endScrolling && state.annonces.length == 0 && (
              <p>Aucune annonce</p>
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

export default MesAnnoncesRoot;
