import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLoaderComponent from "../../../shared/components/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/services/api.service";
import "../../../shared/style/global.scss";
import { Auth } from "../../../shared/types/Utilisateur";
import LoginCard from "../components/login-card.component";
import { login } from "../service/login.service";
import "./login.root.scss";

interface LoginState {
  form: Auth;
  success: string | null;
  error: string | null;
  submitLoading: boolean;
  viewPassword: boolean;
  redirectMessage: boolean;
}

const initialState: LoginState = {
  form: {
    email: "mialisoamurielle@gmail.com",
    password: "mialisoa",
  },
  success: null,
  error: null,
  submitLoading: false,
  viewPassword: false,
  redirectMessage: false,
};

const LoginPage = () => {
  const [state, setState] = useState<LoginState>(initialState);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(state.form.password);

    event.preventDefault();
    if (state.form.email.trim() == "" || state.form.password.trim() == "") {
      setState((state) => ({
        ...state,
        error: "Tous les champs sont obligatoires",
      }));
    }

    setState((state) => ({
      ...state,
      submitLoading: true,
    }));
    login(state.form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data);
        setState((state) => ({
          ...state,
          success: res.data.message,
          submitLoading: false,
        }));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data?.err ||
          err.response?.data?.err == "" ||
          err.response?.data?.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }

        setState((state) => ({
          ...state,
          error: errorMessage,
          submitLoading: false,
        }));
      });
  };

  return (
    <>
      <div className="root-container">
        <div className="bg-clip" />
        <div className="login-page">
          <div className={`left`}>
            {isMobile ? (
              <div className="logo">
                {" "}
                <img src="/images/logo-transparent.png" alt="Logo" />{" "}
              </div>
            ) : (
              <LoginCard />
            )}
          </div>
          <div className="right">
            <div className="form-container">
              <form className="form" onSubmit={handleSubmit}>
                <div className="icon">
                  <img src="/images/login.png" alt="Login" />
                </div>
                <p className="text">
                  Connectez-vous pour une meilleure expérience.
                </p>
                <TextField
                  label="Email"
                  type="email"
                  onChange={(event) =>
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        email: event.target.value as string,
                      },
                    }))
                  }
                  value={state.form.email}
                  className="input"
                />
                <TextField
                  label="Mot de passe"
                  type={state.viewPassword ? "text" : "password"}
                  className={`input ${!state.viewPassword ? "bold" : ""} `}
                  onChange={(event) =>
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        password: event.target.value as string,
                      },
                    }))
                  }
                  value={state.form.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setState((state) => ({
                              ...state,
                              viewPassword: !state.viewPassword,
                            }));
                          }}
                          edge="end"
                        >
                          {state.viewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="action">
                  <Button
                    variant="contained"
                    type="submit"
                    className="primary-div"
                  >
                    <AppLoaderComponent
                      loading={state.submitLoading}
                      width="25px"
                      heigth="25px"
                      color="white"
                    >
                      <>{"Se connecter"}</>
                    </AppLoaderComponent>
                  </Button>
                  <p>
                    <small>
                      Pas encore de compte?{" "}
                      <a href="/download" className="show-link">
                        Inscrivez-vous.
                      </a>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <Snackbar
            open={state.error !== null}
            autoHideDuration={3000}
            onClose={() =>
              setState((state) => ({
                ...state,
                error: null,
              }))
            }
          >
            <Alert severity="error">{state.error as string}</Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
