import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Badge, Card, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { AnnonceGeneral } from "../../../../shared/types/Annonce";
import "./annonce-card.component.scss";

interface AnnonceCardProps {
  annonce: AnnonceGeneral;
}

const AnnonceCard = (props: AnnonceCardProps) => {
  const annonce = props.annonce;

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
  const parseDate = useCallback((date: string) => {
    const day = dayjs(date);
    if (day.isSame(new Date())) {
      return day.format("HH:mm");
    } else {
      return day.format("DD MMMM YYYY");
    }
  }, []);

  const renderClassName = useCallback((note: number) => {
    if (note >= 7) {
      return "success";
    } else if (note >= 4) {
      return "warning";
    }
    return "danger";
  }, []);

  return (
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
          <div className="annonce-info">
            <h2 className="annonce-title light no-margin">
              {annonce.marque.nom}: {annonce.modele.nom}
            </h2>
            <h2 className="light no-margin">Etat: {annonce.etat}/10</h2>
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
            <Checkbox
              icon={<FavoriteBorder fontSize="large" />}
              checkedIcon={<Favorite fontSize="large" />}
            />
          </div>
        </Card>
      </Badge>
    </div>
  );
};

export default AnnonceCard;
