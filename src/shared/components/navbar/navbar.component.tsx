import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import decodeToken from "../../helper/auth-temp.helper";
import CollapsedNavbar from "./collapsed-navbar/collapsed-navbar.component";
import "./navbar.component.scss";
import { MenuItem } from "./types/MenuItem";
import { UserToken } from "./types/UserToken";

const Navbar = () => {
  const user: UserToken | null = decodeToken();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const menus = ["Acheter", "Mes favoris", "Historique", "Messages"];

  const menuItems: MenuItem[] = [
    {
      text: "Acheter",
      link: "/annonces",
      needConnection: false,
    },
    {
      text: "Mes favories",
      link: "/favoris",
      needConnection: true,
    },
    {
      text: "Historique",
      link: "/historique",
      needConnection: true,
    },
    {
      text: "Messages",
      link: "",
      needConnection: true,
    },
  ];
  return (
    <>
      {isMobile ? (
        <CollapsedNavbar menus={menuItems} user={user} />
      ) : (
        <AppBar position="fixed">
          <div className="navbar">
            <div className="nav-logo">
              <img src="/images/logo-transparent.png" alt="logo" />
            </div>
            <div className="nav-links">
              {menuItems.map((m) => {
                if (!m.needConnection || (m.needConnection && user != null)) {
                  return (
                    <Link to={m.link} className="link" key={`nav_${m.text}`}>
                      {m.text}
                    </Link>
                  );
                }
              })}
              {user == null ? (
                <Link to="/login" className="link" key={`nav_login`}>
                  Se connecter
                </Link>
              ) : (
                <div className="link flex">
                  <Tooltip title={user.email} arrow>
                    <Avatar className="div-primary">
                      {user.email.split("")[0].toUpperCase()}
                    </Avatar>
                  </Tooltip>
                  <IconButton className="logout-link" key={`nav_login`}>
                    <LogoutIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
