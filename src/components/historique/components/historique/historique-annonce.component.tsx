import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import GppBadIcon from "@mui/icons-material/GppBad";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Card, CardContent, Zoom } from "@mui/material";
import dayjs from "dayjs";
import { Historique } from "../../../../shared/types/Historique";
import "./historique-annonce.component.scss";

interface HistoriqueProps {
  historique: Historique;
}

interface RenderIcon {
  icon: JSX.Element;
  color: string;
}

dayjs.locale("fr");

const renderDot = (status: string) => {
  if (status == "Création") {
    return {
      icon: <CreateIcon />,
      color: "div-primary",
    };
  }
  if (status == "Validation") {
    return {
      icon: <CheckCircleIcon />,
      color: "div-success",
    };
  }
  if (status == "Refus") {
    return {
      icon: <GppBadIcon />,
      color: "div-danger",
    };
  }
  if (status == "Vendue") {
    return {
      icon: <ShoppingCartIcon />,
      color: "div-warning",
    };
  }
  if (status == "Supprimée") {
    return {
      icon: <DeleteIcon />,
      color: "div-danger",
    };
  }
};

const HistoriqueAnnonce = (props: HistoriqueProps) => {
  let transition = 0;
  return (
    <>
      <div className="annonce_info">
        <Card className="card">
          <CardContent className="card_content">
            <div className="div_info_item">
              <strong>Référence: </strong>
              <strong>{props.historique.reference}</strong>
            </div>
            <div>
              <p>
                Annonce pour{" "}
                <strong>
                  {props.historique.marque} - {props.historique.modele}
                </strong>
              </p>
              <p>Prix: {props.historique.prix.toLocaleString()} MGA</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="timeline">
        <Timeline>
          {props.historique.historiques.map((histo, index) => {
            const dot = renderDot(histo.status);
            transition += 500;
            return (
              <Zoom
                in={true}
                style={{
                  transitionDelay: `${transition}ms`,
                  transition: "ease-in-out 0.3s",
                }}
              >
                <TimelineItem key={`historique_${index}`}>
                  <TimelineSeparator>
                    <TimelineDot className={dot?.color}>
                      {dot?.icon}
                    </TimelineDot>
                    <TimelineConnector className="timeline_connector" />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="timeline_content">
                      <p>{histo.status}</p>
                      <p>
                        <small>
                          {dayjs(histo.date).format("DD MMMM YYYY à HH:mm")}
                        </small>
                      </p>
                    </div>
                  </TimelineContent>
                  <TimelineSeparator />
                  <TimelineSeparator />
                </TimelineItem>
              </Zoom>
            );
          })}
        </Timeline>
      </div>
    </>
  );
};

export default HistoriqueAnnonce;
