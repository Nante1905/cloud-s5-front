import dayjs from "dayjs";
import "dayjs/locale";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/components/title/title.component";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { Historique } from "../../../../shared/types/Historique";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import HistoriqueAnnonce from "../../components/historique/historique-annonce.component";
import { findHistorique } from "../../service/historique.service";

interface DetailsAnnonceState {
  historique: Historique | null;
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: DetailsAnnonceState = {
  historique: null,
  loading: true,
  openError: false,
  errorMessage: "",
};

dayjs.locale("fr");

const HistoriqueAnnonceRoot = () => {
  const id = useParams().id;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    findHistorique(id as string)
      .then((res) => {
        console.log(res);

        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            historique: response.data,
            loading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            openError: true,
            errorMessage: response.err,
            loading: false,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "";
        if (
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
          loading: false,
          openError: true,
        }));
      });
  }, [id]);

  return (
    <>
      <Title>Historique annonce</Title>
      <AppLoaderComponent
        loading={state.loading}
        children={
          <>
            {state.historique != null && (
              <HistoriqueAnnonce historique={state.historique as Historique} />
            )}
          </>
        }
      />
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

export default HistoriqueAnnonceRoot;
