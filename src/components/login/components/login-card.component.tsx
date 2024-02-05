import "./login-card.component.scss";

const LoginCard = () => {
  return (
    <div className="square-container">
      <div className="square-item">
        <img src="/images/logo-fit.png" alt="photo" />
      </div>
      <div className="square-item">
        <img src="/images/voiture1.jpg" alt="photo" />
      </div>
      <div className="square-item">
        <img src="/images/voiture2.jpg" alt="photo" />
      </div>
      <div className="square-item square-logo">
        <img src="/images/logo-transparent.png" alt="photo" />
      </div>
    </div>
  );
};

export default LoginCard;
