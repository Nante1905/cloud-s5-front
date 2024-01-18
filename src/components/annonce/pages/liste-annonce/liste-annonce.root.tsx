import React from "react";
import ListeAnnonce from "../../components/liste-annonce/liste-annonce.component";
import Title from "../../../../shared/components/title/title.component";

const ListeAnnonceRoot = () => {
  return (
    <div>
      <Title>Faites votre choix</Title>
      <ListeAnnonce />
    </div>
  );
};

export default ListeAnnonceRoot;
