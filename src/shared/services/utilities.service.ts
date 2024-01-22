import axios from "axios";
import { URL_API } from "../env/env";

export const findAllCategorie = () =>
    axios.get(
        `${URL_API}/categories`
    );

export const findAllMarque = () =>
    axios.get(
        `${URL_API}/marques`
    );

export const findAllModele = () =>
    axios.get(
        `${URL_API}/modeles`
    );