import { CarRental, Sell } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/navbar/navbar.component";
import "./landing-page.root.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="landing-bg">
        <div className="landing-text">
          <div className="content">
            <div className="text">
              <h1 className="landing-title primary-text">
                {" "}
                <div></div> Bienvenue sur Sera Vaika!
              </h1>
              <p>
                Vendez ou achetez votre véhicule d'occasion en toute confiance
                sur notre plateforme simple et sécurisée. Découvrez un large
                choix de voitures d'occasion à tous les prix et trouvez celle
                qui vous correspond.
              </p>
            </div>
            <div className="div-action">
              <Button
                variant="contained"
                className="btn btn-sell"
                onClick={() => navigate("/download")}
              >
                {" "}
                <Sell /> Vendre ma voiture
              </Button>
              <Button
                variant="contained"
                className="btn btn-buy"
                onClick={() => navigate("/annonces")}
              >
                {" "}
                <CarRental /> Acheter une voiture
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-img">
          <img src="/images/voitures.webp" alt="" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
