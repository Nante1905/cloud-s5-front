/* eslint-disable @typescript-eslint/no-unused-vars */
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../../../shared/components/title/title.component";
import FiltreBar from "../../components/filtre-bar/filtre-bar.component";
import ListeAnnonce from "../../components/liste-annonce/liste-annonce.component";
import "./liste-annonce.root.scss";

interface ListeAnnonceRootState {
  showFilter: boolean;
  showBtnFilter: boolean;
  scrollPosition: number;
}

const initialState: ListeAnnonceRootState = {
  showFilter: false,
  showBtnFilter: true,
  scrollPosition: 0,
};

const ListeAnnonceRoot = () => {
  const [state, setState] = useState<ListeAnnonceRootState>(initialState);

  const handleScrollUp = (currentScroll: number, previousScroll: number) => {
    if (currentScroll < previousScroll) {
      console.log("miakatra");
      setState((state) => ({
        ...state,
        showBtnFilter: true,
      }));
    } else {
      console.log("midina");

      setState((state) => ({
        ...state,
        showBtnFilter: false,
      }));
    }
    console.log("state ", state);
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
        <ListeAnnonce />
      </div>
    </div>
  );
};

export default ListeAnnonceRoot;
