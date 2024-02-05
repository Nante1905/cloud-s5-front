import { jwtDecode } from "jwt-decode";

const decodeToken = (): any => {
    const authToken = localStorage.getItem("token");
    if (authToken != null) {
        const decoded = jwtDecode(authToken);

        return decoded;
    }
    return null;
};

export default decodeToken;