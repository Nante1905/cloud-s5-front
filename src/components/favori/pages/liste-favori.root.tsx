import { useEffect, useRef, useState } from "react";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../shared/components/title/title.component";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { getErrorMessage } from "../../../shared/services/api.service";
import { AnnonceGeneral } from "../../../shared/types/Annonce";
import { ApiResponse } from "../../../shared/types/api/ApiResponse";
import ListeFavori from "../components/liste-favori.component";
import { findAllFavori } from "../service/annonce.service";
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

  const fetchFavori = (
    page: number = state.page,
    annonces: AnnonceGeneral[] = state.annonces
  ) => {
    console.log("fetch page ", page);
    // console.log("filtre ", filtre);
    // console.log("annonces efa ao", annonces);

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
          setState((state) => ({
            ...state,
            annonces: [...annonces, ...(res.data?.data as AnnonceGeneral[])],
            page: state.page + 1,
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
    // TODO: remove in prod
    if (initialized.current == false) {
      console.log("sending requests");
      fetchFavori();
      initialized.current = true;
    }
    window.history.scrollRestoration = "manual";
  });

  return (
    <>
      <div>
        <Title>Vos favoris</Title>
        <ListeFavori
          annonces={state.annonces}
          fetchData={fetchFavori}
          endScrolling={state.endScrolling}
        />
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
