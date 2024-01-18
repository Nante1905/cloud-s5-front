import AnnonceCard from "../annonce-card/annonce-card.component";
import "./liste-annonce.component.scss";

const ListeAnnonce = () => {
  return (
    <>
      <div className="liste-annonce">
        <AnnonceCard />
        <AnnonceCard />
        <AnnonceCard />
        <AnnonceCard />
        <AnnonceCard />
      </div>
    </>
  );
};

export default ListeAnnonce;
