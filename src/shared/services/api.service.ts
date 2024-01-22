import { API_ERROR_MESSAGE } from "../constants/constants";



export const getErrorMessage = (status: string): string => {
    const errors = API_ERROR_MESSAGE;
    for (const error of errors) {
        if (error.code === status) {
            return error.message;
        }

    }
    return 'Erreur interne du serveur.';
}