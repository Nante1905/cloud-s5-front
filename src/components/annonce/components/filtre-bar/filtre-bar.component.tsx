import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./filtre-bar.component.scss";

interface FiltreProps {
  showFilter: boolean;
}

const FiltreBar = (props: FiltreProps) => {
  const categories = [
    {
      id: 1,
      nom: "Sport",
    },
    {
      id: 2,
      nom: "Familial",
    },
  ];

  return (
    <div className={`filtre-bar ${props.showFilter ? "show" : "hide"} `}>
      <h2 className="light">Filtres</h2>
      <form className="form">
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <TextField label="Mot clé" multiline />
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={""}
              label="Catégorie"
            >
              {categories?.map((e) => (
                <MenuItem key={e?.id} value={e?.id}>
                  {e.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Marque</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={""}
              label="Marque"
            >
              {categories?.map((e) => (
                <MenuItem key={e?.id} value={e?.id}>
                  {e.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Modèle</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Modèle"
              defaultValue={""}
            >
              {categories?.map((e) => (
                <MenuItem key={e?.id} value={e?.id}>
                  {e.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DatePicker
                label={"Année de sortie"}
                views={["year"]}
                // onChange={(value: Dayjs | null) => {
                //   console.log(value?.year());
                // }}
                // value={dayjs().year(state.form.anneeSortie)}
              />
            </LocalizationProvider>
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="Prix min"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Ariary</InputAdornment>
                ),
              }}
            />
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="Prix max"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Ariary</InputAdornment>
                ),
              }}
            />
          </FormControl>
          <IconButton className="text-danger">
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group form-action">
          <Button variant="contained">Rechercher</Button>
        </div>
      </form>
    </div>
  );
};

export default FiltreBar;
