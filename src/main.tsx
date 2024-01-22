import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ListeAnnonceRoot from "./components/annonce/pages/liste-annonce/liste-annonce.root.tsx";
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
