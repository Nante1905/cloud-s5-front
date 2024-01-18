/* eslint-disable @typescript-eslint/no-unused-vars */
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Title from "../../../../shared/components/title/title.component";
import { Annonce } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import FiltreBar from "../../components/filtre-bar/filtre-bar.component";
import ListeAnnonce from "../../components/liste-annonce/liste-annonce.component";
import { findAnnonceValideParPage } from "../../service/annonce.service";
import "./liste-annonce.root.scss";

interface ListeAnnonceRootState {
  showFilter: boolean;
  showBtnFilter: boolean;
  scrollPosition: number;
  annonces: Annonce[];
  page: number;
  annonceLoading: boolean;
  annonceError: string;
  endScrolling: boolean;
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

  // MNOLA ANNONCE NON VALIDE NO ATO FA MBOLA TSY VITA NY ENDPOINT
  const fetchAnnonce = () => {
    console.log("fetch page ", state.page);
    setState((state) => ({
      ...state,
      annonceLoading: true,
    }));
    findAnnonceValideParPage(state.page)
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
            annonces: [...state.annonces, ...(res.data?.data as Annonce[])],
            annonceLoading: false,
            page: state.page + 1,
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

  return (
    <div>
      <Title>Faites votre choix</Title>
      <FiltreBar showFilter={state.showFilter} />
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
    </div>
  );
};

export default ListeAnnonceRoot;
