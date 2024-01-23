/* eslint-disable @typescript-eslint/no-unused-vars */
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/components/title/title.component";
import { getErrorMessage } from "../../../../shared/services/api.service";
import {
  findAllCategorie,
  findAllMarque,
  findAllModele,
} from "../../../../shared/services/utilities.service";
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import { Categorie } from "../../../../shared/types/Categorie";
import { Marque } from "../../../../shared/types/Marque";
import { Modele } from "../../../../shared/types/Modele";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import FiltreBar from "../../components/filtre-bar/filtre-bar.component";
import ListeAnnonce from "../../components/liste-annonce/liste-annonce.component";
import { TAILLE_PAGE, filtreAnnonce } from "../../service/annonce.service";
import { FiltreRequest, initialFiltre } from "../../types/filtre.type";
import "./liste-annonce.root.scss";

interface ListeAnnonceRootState {
  showFilter: boolean;
  showBtnFilter: boolean;
  scrollPosition: number;
  annonces: AnnonceGeneral[];
  page: number;
  annonceLoading: boolean;
  annonceError: string;
  endScrolling: boolean;
  openError: boolean;
  errorMessage: string;

  categories: Categorie[];
  modeles: Modele[];
  marques: Marque[];

  filtre: FiltreRequest;
}

const initialState: ListeAnnonceRootState = {
  showFilter: false,
  showBtnFilter: true,
  scrollPosition: 0,
  annonces: [],
  page: 1,
  annonceLoading: false,
  annonceError: "",
  endScrolling: false,
  openError: false,
  errorMessage: "",

  categories: [],
  modeles: [],
  marques: [],

  filtre: initialFiltre,
};

const ListeAnnonceRoot = () => {
  const [state, setState] = useState<ListeAnnonceRootState>(initialState);
  const initialized = useRef(false);

  const handleScrollUp = (currentScroll: number, previousScroll: number) => {
    if (currentScroll < previousScroll) {
      setState((state) => ({
        ...state,
        showBtnFilter: true,
      }));
    } else {
      setState((state) => ({
        ...state,
        showBtnFilter: false,
      }));
    }
  };

  const fetchAnnonce = (
    filtre: FiltreRequest = state.filtre,
    page: number = state.page,
    annonces: AnnonceGeneral[] = state.annonces
  ) => {
    console.log("fetch page ", page);
    // console.log("filtre ", filtre);
    // console.log("annonces efa ao", annonces);

    setState((state) => ({
      ...state,
      annonceLoading: true,
    }));
    filtreAnnonce(filtre, page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(res);
        if (response.data.length == 0) {
          setState((state) => ({
            ...state,
            endScrolling: true,
            annonceLoading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            annonces: [...annonces, ...(res.data?.data as AnnonceGeneral[])],
            annonceLoading: false,
            page: state.page + 1,
            endScrolling: response.data.length < TAILLE_PAGE,
          }));
        }
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          annonceLoading: false,
          annonceError: err?.response?.data?.message,
        }));
        console.log(err);
      });
  };

  const handleScroll = (previousScroll: number) => {
    const currentScroll = window.scrollY;
    handleScrollUp(currentScroll, previousScroll);
    setState((state) => ({
      ...state,
      scrollPosition: currentScroll,
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll(state.scrollPosition));
    // juste pour éviter qu'USeEffect se réexecute en env dev fa jsp en prod otrn tsy manao check intsony React.StrictMode
    if (initialized.current == false) {
      console.log("sending request");
      fetchAnnonce();
      initialized.current = true;
    }
    window.history.scrollRestoration = "manual";

    return () => {
      window.removeEventListener("scroll", () =>
        handleScroll(state.scrollPosition)
      );
    };
  }, [state.scrollPosition, state.showBtnFilter]);

  useEffect(() => {
    console.log("fecth categorie");

    findAllCategorie()
      .then((res) => {
        const response: ApiResponse = res.data;

        if (response.ok) {
          setState((state) => ({
            ...state,
            categories: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            openError: true,
            errorMessage: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
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
          openError: true,
          errorMessage: errorMessage,
        }));
      });

    console.log("fecth categorie");
    findAllMarque()
      .then((res) => {
        const response: ApiResponse = res.data;

        if (response.ok) {
          setState((state) => ({
            ...state,
            marques: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            openError: true,
            errorMessage: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
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
          openError: true,
          errorMessage: errorMessage,
        }));
      });

    console.log("fecth modele");

    findAllModele()
      .then((res) => {
        const response: ApiResponse = res.data;

        if (response.ok) {
          setState((state) => ({
            ...state,
            modeles: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            openError: true,
            errorMessage: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
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
          openError: true,
          errorMessage: errorMessage,
        }));
      });
  }, []);

  const submitFiltre = (form: FiltreRequest) => {
    console.log("FILTRER");
    // window.screenTop = 0;

    setState((state) => ({
      ...state,
      annonces: [],
      page: 1,
      filtre: form,
    }));
    console.log(state.page);

    fetchAnnonce(form, 1, []);
  };

  // TO DO: ref miala ve ny filtre rehetra d miverina mi fetch sa mila mipotsitra bouton rechercher ndray izy vao manao an'izay
  const cancelFiltre = () => {
    // setState((state) => ({
    //   ...state,
    //   annonces: [],
    //   page: 1,
    //   filtre: initialFiltre,
    // }));
  };

  return (
    <div>
      <Title>Faites votre choix</Title>
      <FiltreBar
        showFilter={state.showFilter}
        categories={state.categories}
        modeles={state.modeles}
        marques={state.marques}
        onSubmit={submitFiltre}
        onCancelFiltre={cancelFiltre}
      />
      <div className="annonces-container">
        <div className="filtre-btn">
          <Button
            className={`btn ${state.showBtnFilter ? "" : "hide"}`}
            onClick={() =>
              setState((state) => ({
                ...state,
                showFilter: !state.showFilter,
              }))
            }
          >
            {!state.showFilter ? (
              <>
                <FilterAltIcon />
                Filtre
              </>
            ) : (
              <>
                <FilterAltOffIcon />
                Fermer le filtre
              </>
            )}
          </Button>
        </div>
        <ListeAnnonce
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
    </div>
  );
};

export default ListeAnnonceRoot;
