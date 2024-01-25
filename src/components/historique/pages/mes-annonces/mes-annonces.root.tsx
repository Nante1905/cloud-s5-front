import { useEffect, useRef, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/components/title/title.component";
import { TAILLE_PAGE } from "../../../../shared/constants/constants";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import MesAnnonces from "../../components/mes-annonces.component";
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
      fetchAnnonce();
      initialized.current = true;
    }
    window.history.scrollRestoration = "manual";
  });

  return (
    <>
      <div>
        <Title>Vos annonces</Title>
        <MesAnnonces
          annonces={state.annonces}
          fetchData={fetchAnnonce}
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

export default MesAnnoncesRoot;
