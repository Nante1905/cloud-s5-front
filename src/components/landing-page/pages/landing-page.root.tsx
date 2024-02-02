import { CarRental, Sell } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./landing-page.root.scss";

const LandingPage = () => {
  return (
    <div className="landing-bg">
      <div className="landing-text">
        <div className="content">
          <h1 className="landing-title primary-text">
            {" "}
            <div></div> Bienvenue!
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            exercitationem molestias, nisi consectetur nihil cumque quisquam
            expedita, accusantium ducimus omnis quaerat maxime eos natus quo,
            facilis sit laborum. Iste, perferendis.
          </p>
          <div className="div-action">
            <Button variant="contained" className="btn btn-sell">
              {" "}
              <Sell /> Vendre ma voiture
            </Button>
            <Button variant="contained" className="btn btn-buy">
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
  );
};

export default LandingPage;
