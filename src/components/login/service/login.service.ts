import { http } from "../../../shared/services/interceptor/axios.interceptor";
import { Auth } from "../../../shared/types/Utilisateur";

export const login = (form: Auth) =>
    http.post(`/auth/login`, form);

export const logout = () => localStorage.removeItem('token')