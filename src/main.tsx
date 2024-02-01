import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import DetailsAnnonceRoot from "./components/annonce/pages/details-annonce/details-annonce.root.tsx";
import ListeAnnonceRoot from "./components/annonce/pages/liste-annonce/liste-annonce.root.tsx";
import ListeFavoriRoot from "./components/favori/pages/liste-favori.root.tsx";
import MesAnnoncesRoot from "./components/historique/pages/mes-annonces/mes-annonces.root.tsx";
import LandingPage from "./components/landing-page/pages/landing-page.component.tsx";
import "./index.css";
import { store } from "./shared/store/store.ts";

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
