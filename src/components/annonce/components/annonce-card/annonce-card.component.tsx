import { ChatBubbleRounded, Visibility } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Badge, Card, Checkbox, IconButton, Tooltip } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ChipStatusAnnonce from "../../../../shared/components/chip-status-annonce/chip-status-annonce.component";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import { getErrorMessage } from "../../../../shared/services/api.service";
import { numberFormatter } from "../../../../shared/services/render.service";
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import { ApiResponse } from "../../../../shared/types/api/ApiResponse";
import { parseDate, toggleFavori } from "../../service/annonce.service";
import "./annonce-card.component.scss";

interface AnnonceCardProps {
  annonce: AnnonceGeneral;
  likeable: boolean;
  showStatus: boolean;
  onClick: () => void;
}

interface AnnonceCardState {
  openError: boolean;
  error: string;
  openSuccess: boolean;
  success: string;
  loadingLike: boolean;
}

const initialState: AnnonceCardState = {
  openError: false,
  error: "",
  openSuccess: false,
  success: "",
  loadingLike: false,
};

const AnnonceCard = (props: AnnonceCardProps) => {
  const annonce = props.annonce;
  const lastFavori = useRef(annonce.favori);
  const [state, setState] = useState<AnnonceCardState>(initialState);

  // TODO: alana ito
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

  const renderClassName = useCallback((note: number) => {
    if (note >= 7) {
      return "success";
    } else if (note >= 4) {
      return "warning";
    }
    return "danger";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setState((state) => ({
        ...state,
        loadingLike: false,
      }));
    }, 1500);
  }, [state.loadingLike]);

  const onToggleLike = useCallback(() => {
    if (props.likeable) {
      console.log("etat  taloha ", lastFavori);

      toggleFavori(annonce.id)
        .then((res) => {
          const response: ApiResponse = res.data;

          if (response.ok) {
            if (lastFavori.current == false) {
              setState((state) => ({
                ...state,
                loadingLike: true,
              }));
            }
            setState((state) => ({
              ...state,
              success: response.message,
              openSuccess: true,
            }));
            lastFavori.current = !lastFavori.current;
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
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
            error: errorMessage,
            openError: true,
          }));
        });
    }
  }, []);

  return (
    <>
      <div>
        <Badge
          badgeContent={`${annonce.etat}/10`}
          className={renderClassName(annonce.etat)}
        >
          <Card className="annonce-card">
            <div className="annonce-images">
              {/* <img src="/images/logo-fit.png" alt="" /> */}
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
            </div>

            <div
              className={`annonce-info ${!props.likeable ? "padding" : ""} `}
              onClick={props.onClick}
            >
              {props.showStatus && (
                <ChipStatusAnnonce status={annonce.status} />
              )}
              <h2 className="annonce-title light no-margin">
                {annonce.marque.nom}: {annonce.modele.nom}
              </h2>
              <div className="utilisateur">
                <p className="no-margin">
                  {annonce.utilisateur.nom} {annonce.utilisateur.prenom}
                </p>
                <small>{parseDate(annonce.creation)}</small>
              </div>
              <h3 className="no-margin">
                {annonce.prix.toLocaleString("fr")} MGA
              </h3>
            </div>
            <div className="favorite-icon">
              <div className="flex">
                <span>{numberFormatter.format(annonce.vues)}</span>
                <Visibility className="icon" />
              </div>
              {/* TODO: rediriger vers discussion */}
              {props.likeable && (
                <>
                  <Tooltip title="Contacter le vendeur" arrow>
                    <IconButton>
                      <ChatBubbleRounded />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title={
                      lastFavori.current
                        ? "Supprimer de mes favoris"
                        : "Mettre en favori"
                    }
                  >
                    <Checkbox
                      icon={<FavoriteBorder fontSize="large" />}
                      checkedIcon={<Favorite fontSize="large" />}
                      onChange={onToggleLike}
                      checked={lastFavori.current}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </Card>

          <div className={`liking-gif ${state.loadingLike ? "action" : ""} `}>
            <img src="/images/hearts-heart.gif" alt="" />
          </div>
        </Badge>
      </div>
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.error}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() =>
          setState(() => ({
            ...state,
            openSuccess: false,
          }))
        }
        message={state.success}
      />
    </>
  );
};

export default AnnonceCard;
