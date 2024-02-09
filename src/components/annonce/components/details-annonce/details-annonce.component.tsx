// interface DetailsAnnonce

import {
  ChatBubbleRounded,
  Favorite,
  FavoriteBorder,
  Person,
  Visibility,
} from "@mui/icons-material";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import ChipStatusAnnonce from "../../../../shared/components/chip-status-annonce/chip-status-annonce.component";
import AppLoaderComponent from "../../../../shared/components/loader/app-loader.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { numberFormatter } from "../../../../shared/services/render.service";
import { Annonce } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import {
  getDiscussion,
  getImageOfAnnonce,
  parseDate,
  toggleFavori,
} from "../../service/annonce.service";
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
  showLike: boolean;
  loadingDislike: boolean;
  openMessage: boolean;
}

const DetailsAnnonce = (props: DetailsAnnonceProps) => {
  const annonce = props.annonce;
  const initialState: DetailsAnnonceState = {
    openError: false,
    errorMessage: "",
    openSuccess: false,
    successMessage: "",
    favori: false,
    loadingLike: false,
    showLike: false,
    loadingDislike: false,
    openMessage: false,
  };
  const [state, setState] = useState(initialState);
  const lastLike = useRef(annonce == null ? false : annonce.favori);
  const navigate = useNavigate();

  useEffect(() => {
    setState((state) => ({
      ...state,
      favori: props.annonce.favori,
    }));
    // lastLike.current =
  }, [props]);

  useEffect(() => {
    setTimeout(() => {
      setState((state) => ({
        ...state,
        showLike: false,
      }));
    }, 1500);
  }, [state.showLike]);

  const onToggleLike = useCallback(() => {
    console.log("toggle ", lastLike.current);

    if (lastLike.current == true) {
      setState((state) => ({
        ...state,
        loadingDislike: true,
      }));
    } else {
      setState((state) => ({
        ...state,
        loadingLike: true,
      }));
    }
    toggleFavori(annonce.id)
      .then((res) => {
        console.log(res);

        const response: ApiResponse = res.data;

        if (response.ok) {
          if (lastLike.current == false) {
            setState((state) => ({
              ...state,
              showLike: true,
            }));
          }
          setState((state) => ({
            ...state,
            successMessage: response.message,
            openSuccess: true,
            favori: !state.favori,
            loadingDislike: false,
            loadingLike: false,
          }));
          lastLike.current = !lastLike.current;
        } else {
          setState((state) => ({
            ...state,
            errorMessage: response.err,
            openError: true,
            loadingDislike: false,
            loadingLike: false,
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
          loadingDislike: false,
          loadingLike: false,
        }));
      });
  }, []);

  const goToChat = (proprio: number) => {
    setState((state) => ({
      ...state,
      openMessage: true,
    }));
    getDiscussion(proprio)
      .then((res) => {
        console.log(res);
        const response: ApiResponse = res.data;
        if (response.ok) {
          navigate(`/messagerie?id=${response.data.idDiscussion}`);
        } else {
          setState((state) => ({
            ...state,
            openError: true,
            error: response.err,
            openMessage: false,
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
          error: errorMessage,
          openMessage: true,
        }));
      });
  };

  return (
    <>
      <div className="img-container">
        {annonce.photos == null || annonce.photos.length == 0 ? (
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
            {getImageOfAnnonce(annonce).map((p, index) => (
              <div key={`img_${index}`}>
                <img src={p.url} />
              </div>
            ))}
          </Carousel>
        )}
        <div className={`liking-gif ${state.showLike ? "action" : ""} `}>
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
                <div className="div_info_item">
                  <div>
                    <strong>Prix: </strong>
                    <span>
                      <u>{annonce.prix.toLocaleString()} MGA</u>
                    </span>
                  </div>
                  <ChipStatusAnnonce status={annonce.status} />
                </div>
              </div>
              <div className="icon-action">
                <Tooltip title={"Nombre de vues"} arrow>
                  <div className="flex">
                    <span>{numberFormatter.format(annonce.nbVues)}</span>
                    <Visibility className="icon" />
                  </div>
                </Tooltip>
                <Tooltip
                  title={
                    state.favori
                      ? "Supprimer de mes favoris"
                      : "Mettre en favori"
                  }
                  arrow
                >
                  <AppLoaderComponent
                    loading={state.loadingLike || state.loadingDislike}
                    width="25px"
                    heigth="25px"
                  >
                    <Checkbox
                      icon={<FavoriteBorder fontSize="large" />}
                      checkedIcon={<Favorite fontSize="large" />}
                      onChange={onToggleLike}
                      checked={state.favori}
                    />
                  </AppLoaderComponent>
                </Tooltip>
                <Tooltip title="Contacter le vendeur" arrow>
                  <IconButton
                    onClick={() => goToChat(annonce.utilisateur.id as number)}
                  >
                    <AppLoaderComponent
                      loading={state.openMessage}
                      width="25px"
                      heigth="25px"
                    >
                      <ChatBubbleRounded />
                    </AppLoaderComponent>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
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
