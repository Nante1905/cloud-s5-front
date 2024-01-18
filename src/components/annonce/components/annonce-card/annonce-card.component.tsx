import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Card, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./annonce-card.component.scss";

const AnnonceCard = () => {
  const parseDate = useCallback((date: string) => {
    const day = dayjs(date);
    if (day.isSame(new Date())) {
      return day.format("HH:mm");
    } else {
      return day.format("DD MMMM YYYY");
    }
  }, []);

  return (
    <div>
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
            <div>
              <img src="/images/voiture1.jpg" />
            </div>
            <div>
              <img src="/images/mercedes5.jpg" />
            </div>
            <div>
              <img src="/images/voiture2.jpg" />
            </div>
            <div>
              <img src="/images/voiture1.jpg" />
            </div>
          </Carousel>
        </div>
        <div className="annonce-info">
          <h2 className="annonce-title light no-margin">
            Mercedes Benz - E class AMG
          </h2>
          <div className="utilisateur">
            <p className="no-margin">Rakoto Jean</p>
            <small>{parseDate("2024-01-05T15:04:03")}</small>
          </div>
          <h3 className="no-margin">12 000 000 MGA</h3>
        </div>
        <div className="favorite-icon">
          <Checkbox
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={<Favorite fontSize="large" />}
          />
        </div>
      </Card>
    </div>
  );
};

export default AnnonceCard;
