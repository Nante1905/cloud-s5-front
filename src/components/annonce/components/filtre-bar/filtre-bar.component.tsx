import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useCallback, useState } from "react";
import { Categorie } from "../../../../shared/types/Categorie";
import { Marque } from "../../../../shared/types/Marque";
import { Modele } from "../../../../shared/types/Modele";
import { FiltreRequest } from "../../types/filtre.type";
import "./filtre-bar.component.scss";

interface FiltreProps {
  showFilter: boolean;
  categories: Categorie[];
  marques: Marque[];
  modeles: Modele[];
  onSubmit: (form: FiltreRequest) => void;
  onCancelFiltre: () => void;
}

interface FiltreState {
  categoriesId: string[];
  marquesId: string[];
  modelesId: string[];
  form: {
    motCle: string | null;
    prixMin: string | null;
    prixMax: string | null;
    anneeMiseCirculation: string | null;
    marque: Marque[] | null;
    modele: Modele[] | null;
    categorie: Categorie[] | null;
  };
}

const initialState: FiltreState = {
  categoriesId: [],
  marquesId: [],
  modelesId: [],
  form: {
    motCle: null,
    prixMin: "",
    prixMax: "",
    anneeMiseCirculation: "",
    marque: null,
    modele: null,
    categorie: null,
  },
};

const FiltreBar = (props: FiltreProps) => {
  const categories = props.categories;
  const [state, setState] = useState<FiltreState>(initialState);

  const handleCategorieChange = useCallback(
    (event: SelectChangeEvent<typeof state.categoriesId>) => {
      const {
        target: { value },
      } = event;

      setState((state) => ({
        ...state,
        categoriesId: value as string[],
      }));
    },
    []
  );

  const handleModeleChange = useCallback(
    (event: SelectChangeEvent<typeof state.categoriesId>) => {
      const {
        target: { value },
      } = event;

      setState((state) => ({
        ...state,
        modelesId: value as string[],
      }));
    },
    []
  );

  const handleMarqueChange = useCallback(
    (event: SelectChangeEvent<typeof state.categoriesId>) => {
      const {
        target: { value },
      } = event;

      setState((state) => ({
        ...state,
        marquesId: value as string[],
      }));
    },
    []
  );

  const renderModele = useCallback(
    (value: string | number): string => {
      const modele = props.modeles.find((c) => c.id == Number(value));

      return `${modele?.marque?.nom} - ${modele?.nom}`;
    },
    [props.modeles]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = state.form;

    const filtre: FiltreRequest = {
      motCle: form.motCle === "" ? null : form.motCle,
      categorie:
        state.categoriesId.length == 0
          ? null
          : state.categoriesId.map((c) => ({ id: Number(c) } as Categorie)),
      marque:
        state.marquesId.length == 0
          ? null
          : state.marquesId.map((c) => ({ id: Number(c) } as Marque)),
      modele:
        state.modelesId.length == 0
          ? null
          : state.modelesId.map((c) => ({ id: Number(c) } as Modele)),
    };

    if (form.prixMin != "") {
      filtre["prixMin"] = form.prixMin as string;
    }
    if (form.prixMax != "") {
      filtre["prixMax"] = form.prixMax as string;
    }
    if (form.anneeMiseCirculation != "") {
      filtre["anneeMiseCirculation"] = form.anneeMiseCirculation as string;
    }

    props.onSubmit(filtre);
  };

  const cancelFiltre = () => {
    setState((state) => ({
      ...state,
      categoriesId: [],
      marquesId: [],
      modelesId: [],
      form: initialState.form,
    }));
    props.onCancelFiltre;
  };

  return (
    <div className={`filtre-bar ${props.showFilter ? "show" : "hide"} `}>
      <h2 className="light title">
        Filtres{" "}
        <IconButton className="text-danger" onClick={cancelFiltre}>
          <CancelIcon />
        </IconButton>{" "}
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="Mot clé"
              multiline
              value={state.form.motCle}
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    motCle: event.target.value,
                  },
                }));
              }}
            />
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  motCle: "",
                },
              }))
            }
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Catégorie"
              multiple
              value={state.categoriesId}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip
                      key={`c_${index}`}
                      label={categories.find((c) => c.id == Number(value))?.nom}
                    />
                  ))}
                </Box>
              )}
              onChange={handleCategorieChange}
            >
              {categories?.map((e) => (
                <MenuItem key={`c2_${e.id}`} value={e.id}>
                  {e.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                categoriesId: [],
              }))
            }
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Marque</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Marque"
              multiple
              value={state.marquesId}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip
                      key={`m_${index}`}
                      label={
                        props.marques.find((c) => c.id == Number(value))?.nom
                      }
                    />
                  ))}
                </Box>
              )}
              onChange={handleMarqueChange}
            >
              {props.marques?.map((e) => (
                <MenuItem key={`c2_${e.id}`} value={e.id}>
                  {e.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                marquesId: [],
              }))
            }
          >
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
              multiple
              value={state.modelesId}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip key={`mm_${index}`} label={renderModele(value)} />
                  ))}
                </Box>
              )}
              onChange={handleModeleChange}
            >
              {props.modeles.map((e) => (
                <MenuItem key={`c2_${e.id}`} value={e.id}>
                  {renderModele(e.id as number)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                modelesId: [],
              }))
            }
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group">
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DatePicker
                label={"Année de sortie"}
                views={["year"]}
                onChange={(value: Dayjs | null) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      anneeMiseCirculation:
                        value?.year() == undefined
                          ? ""
                          : (value?.year() as number).toString(),
                    },
                  }));
                }}
                defaultValue={null}
                value={
                  state.form.anneeMiseCirculation !== ""
                    ? dayjs().year(Number(state.form.anneeMiseCirculation))
                    : null
                }
              />
            </LocalizationProvider>
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  anneeMiseCirculation: "",
                },
              }))
            }
          >
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
              value={state.form.prixMin}
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    prixMin: event.target.value,
                  },
                }));
              }}
            />
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  prixMin: "",
                },
              }))
            }
          >
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
              value={
                state.form.prixMax !== null ? state.form.prixMax : undefined
              }
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    prixMax: event.target.value,
                  },
                }));
              }}
            />
          </FormControl>
          <IconButton
            className="text-danger"
            onClick={() =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  prixMax: "",
                },
              }))
            }
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className="input-group form-action">
          <Button variant="contained" type="submit">
            Rechercher
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FiltreBar;
