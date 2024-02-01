import { Chip } from "@mui/material";
import "./chip-status-annonce.scss";

interface ChipStatusProps {
  status: number;
}

const ChipStatusAnnonce = (props: ChipStatusProps) => {
  const renderChip = () => {
    if (props.status == 0) return <Chip label="Attente de validation" />;
    if (props.status == -5)
      return <Chip label="Refusé" className="chip danger" />;
    if (props.status == 5)
      return <Chip label="Disponible" className="chip success" />;
    if (props.status == 10)
      return <Chip label="Vendu" className="chip warning" />;
    if (props.status == -10)
      return <Chip label="Annonce supprimée" className="chip danger" />;
  };
  return <>{renderChip()}</>;
};

export default ChipStatusAnnonce;
