import { Zoom } from "@mui/material";
import QRCode from "react-qr-code";
import { MOBILE_APP } from "../../../shared/env/env";
import "./download-page.root.scss";

const DownloadPage = () => {
  return (
    <div className="download-bg">
      <div className="download-text">
        <div className="content">
          <div className="text">
            <h1 className="landing-title primary-text">
              {" "}
              <div></div> Installez notre app mobile
            </h1>
            <p>
              Faites partie de la communauté <strong>Sera Vaika</strong> en
              téléchargeant l'application mobile et en vous inscrivant. Ainsi,
              vous pourriez mettre votre voiture en vente, créer de nouvelles
              annonces et vous aurez une vue d'ensemble sur toutes vos annonces.
              N'attendez plus, télécharger l'application en scannant ce QR Code,
              et inscrivez-vous en seulement quelques clics.
            </p>
          </div>
          <div className="div-action">
            <div className="div_qr-code">
              <QRCode value={MOBILE_APP} fgColor="#000" bgColor="transparent" />
            </div>
            <div className="logo">
              <img src="/images/logo-transparent.png" alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="img-container">
        <Zoom
          in={true}
          style={{
            transitionDelay: `400ms`,
            transition: "ease-in-out 0.3s",
          }}
        >
          <img src="/images/phone-v2.png" alt="" />
        </Zoom>
      </div>
    </div>
  );
};

export default DownloadPage;
