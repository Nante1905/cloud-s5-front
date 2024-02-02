// interface DetailsAnnonce

import {
  ChatBubbleRounded,
  Favorite,
  FavoriteBorder,
  Person,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ChipStatusAnnonce from "../../../../shared/components/chip-status-annonce/chip-status-annonce.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { Annonce } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import { parseDate, toggleFavori } from "../../service/annonce.service";
import "./details-annonce.component.scss";
dayjs.locale("fr");

interface DetailsAnnonceProps {
  annonce: Annonce;
}

interface DetailsAnnonceState {
  openError: boolean;
  errorMessage: string;
  openSuccess: boolean;
  successMessage: string;
  favori: boolean;
  loadingLike: boolean;
}

const DetailsAnnonce = (props: DetailsAnnonceProps) => {
  const annonce = props.annonce;
  const initialState: DetailsAnnonceState = {
    openError: false,
    errorMessage: "",
    openSuccess: false,
    successMessage: "",
    favori: annonce.favori,
    loadingLike: false,
  };
  const [state, setState] = useState(initialState);
  const lastLike = useRef(annonce.favori);
  // TODO: ALANA ITO
  annonce.photos = [
    {
      url: "/images/voiture1.jpg",
    },
    {
      url: "/images/mercedes5.jpg",
    },
    {
      url: "/images/voiture2.jpg",
    },
    {
      url: "/images/voiture1.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setState((state) => ({
        ...state,
        loadingLike: false,
      }));
    }, 1500);
  }, [state.loadingLike]);

  const onToggleLike = useCallback(() => {
    console.log("toggle ", lastLike.current);

    toggleFavori(annonce.id)
      .then((res) => {
        console.log(res);

        const response: ApiResponse = res.data;

        if (response.ok) {
          if (lastLike.current == false) {
            setState((state) => ({
              ...state,
              loadingLike: true,
            }));
          }
          setState((state) => ({
            ...state,
            successMessage: response.message,
            openSuccess: true,
            favori: !state.favori,
          }));
          lastLike.current = !lastLike.current;
        } else {
          setState((state) => ({
            ...state,
            errorMessage: response.err,
            openError: true,
          }));
        }
      })
      .catch((err) => {
        console.log(err);

        let errorMessage = "";
        if (err.response.status == 403) {
          errorMessage = "Connectez vous pour mettre une annonce en favori.";
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
  }, []);

  return (
    <>
      <div className="img-container">
        {annonce.photos.length == 0 ? (
          "Aucune photo"
        ) : (
          <Carousel
            showArrows={false}
            axis="horizontal"
            emulateTouch={true}
            statusFormatter={(current: number, total: number) =>
              `${current}/${total}`
            }
          >
            {annonce.photos.map((p, index) => (
              <div key={`img_${index}`}>
                <img src={p.url} />
              </div>
            ))}
          </Carousel>
        )}
        <div className={`liking-gif ${state.loadingLike ? "action" : ""} `}>
          <img src="/images/hearts-heart.gif" alt="" />
        </div>
      </div>
      <div className="info-container">
        <div className="card card_annonce">
          <div className="info_user">
            <div className="info_header">
              <div>
                <div className="div_info_item">
                  <Person />
                  <span>
                    {annonce.utilisateur.nom} {annonce.utilisateur.prenom}
                  </span>
                </div>
                <small>
                  {" "}
                  {annonce.dateCreation ? parseDate(annonce.dateCreation) : ""}
                </small>
              </div>
              <div className="icon-action">
                <IconButton>
                  <ChatBubbleRounded />
                </IconButton>
                <Checkbox
                  icon={<FavoriteBorder fontSize="large" />}
                  checkedIcon={<Favorite fontSize="large" />}
                  onChange={onToggleLike}
                  checked={state.favori}
                />
              </div>
            </div>
          </div>
          <div className="div_info_item">
            <div>
              <strong>Prix: </strong>
              <span>
                <u>{annonce.prix.toLocaleString()} MGA</u>
              </span>
            </div>
            <ChipStatusAnnonce status={annonce.status} />
          </div>
          <div className="div_info_item_no_flex">
            <p
              dangerouslySetInnerHTML={{
                __html: annonce.description,
              }}
            />
          </div>

          <h2 className="title secondary-text">Information technique</h2>
          <div className="div_info_item">
            <strong>Marque: </strong>
            <span>{annonce.voiture.modele.marque.nom}</span>
          </div>
          <div className="div_info_item">
            <strong>Modèle: </strong>
            <span>{annonce.voiture.modele.nom}</span>
          </div>
          <div className="div_info_item">
            <strong>Catégorie: </strong>
            <span>{annonce.voiture.modele.categorie.nom}</span>
          </div>
          <div className="div_info_item">
            <strong>Mise en circulation: </strong>
            <span>{annonce.voiture.modele.anneeSortie}</span>
          </div>
          <div className="div_info_item">
            <strong>Etat: </strong>
            <span>
              <strong>{annonce.voiture.etat} / 10</strong>
            </span>
          </div>
          <div className="div_info_item">
            <strong>Couleur: </strong>
            <span
              className="box-color"
              style={{ background: annonce.voiture.couleur.hexa }}
            ></span>
          </div>
          <div className="div_info_item">
            <strong>Energie: </strong>
            <span>{annonce.voiture.energie.nom}</span>
          </div>
          <div className="div_info_item">
            <strong>Boîte de vitesse: </strong>
            <span>{annonce.voiture.vitesse.nom}</span>
          </div>
          <div className="div_info_item">
            <strong>Consommation: </strong>
            <span>
              {annonce.voiture.consommation?.toLocaleString()} L/100 km
            </span>
          </div>
          <div className="div_info_item">
            <strong>Kilométrage: </strong>
            <span>{annonce.voiture.kilometrage?.toLocaleString()} km</span>
          </div>
          <div className="div_info_item">
            <strong>Nombre de place: </strong>
            <span>{annonce.voiture.modele.nbPlace}</span>
          </div>
          <div className="div_info_item">
            <strong>Nombre de porte: </strong>
            <span>{annonce.voiture.modele.nbPorte}</span>
          </div>
        </div>
      </div>
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.errorMessage}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() =>
          setState(() => ({
            ...state,
            openSuccess: false,
          }))
        }
        message={state.successMessage}
      />
    </>
  );
};

export default DetailsAnnonce;
