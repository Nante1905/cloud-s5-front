import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/components/title/title.component";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { Annonce } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import DetailsAnnonce from "../../components/details-annonce/details-annonce.component";
import { getById } from "../../service/annonce.service";
import "./details-annonce.root.scss";

interface DetailsAnnonceState {
  annonce: Annonce | null;
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: DetailsAnnonceState = {
  annonce: null,
  loading: true,
  openError: false,
  errorMessage: "",
};

const DetailsAnnonceRoot = () => {
  const id = useParams().id;
  const [state, setState] = useState<DetailsAnnonceState>(initialState);

  useEffect(() => {
    getById(id as string)
      .then((res) => {
        console.log(res);

        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            annonce: response.data,
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
          error: errorMessage,
          loading: false,
        }));
      });
  }, [id]);

  return (
    <>
      <AppLoaderComponent
        loading={state.loading}
        children={
          <>
            <Title>{`Annonce ${state.annonce?.reference as string}`}</Title>
            <div className="details-annonce">
              <DetailsAnnonce annonce={state.annonce as Annonce} />
            </div>
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

export default DetailsAnnonceRoot;
