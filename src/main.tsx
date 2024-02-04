import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import DetailsAnnonceRoot from "./components/annonce/pages/details-annonce/details-annonce.root.tsx";
import ListeAnnonceRoot from "./components/annonce/pages/liste-annonce/liste-annonce.root.tsx";
import DownloadPage from "./components/download-page/pages/download-page.root.tsx";
import ListeFavoriRoot from "./components/favori/pages/liste-favori.root.tsx";
import HistoriqueAnnonceRoot from "./components/historique/pages/historique-annonce/historique-annonce.root.tsx";
import MesAnnoncesRoot from "./components/historique/pages/mes-annonces/mes-annonces.root.tsx";
import LandingPage from "./components/landing-page/pages/landing-page.root.tsx";
import "./index.css";
import { store } from "./shared/store/store.ts";

dayjs.locale("fr");

const theme = createTheme(
  {
    typography: {
      fontFamily: "Jost",
    },
  },
  frFR
);

const routes = createBrowserRouter([
  {
    path: "/download",
    element: <DownloadPage />,
  },
  {
    path: "",
    element: (
      <App>
        <Outlet />
      </App>
    ),
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/annonces",
        element: <ListeAnnonceRoot />,
      },
      {
        path: "/favoris",
        element: <ListeFavoriRoot />,
      },
      {
        path: "/historique",
        element: <MesAnnoncesRoot />,
      },
      {
        path: "/annonces/:id",
        element: <DetailsAnnonceRoot />,
      },
      {
        path: "/annonces/:id/historique",
        element: <HistoriqueAnnonceRoot />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
