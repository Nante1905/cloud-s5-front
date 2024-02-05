import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "../types/MenuItem";
import { UserToken } from "../types/UserToken";
import "./collapsed-navbar.component.scss";

interface CollapsedNavbarState {
  open: boolean;
}

const initialState: CollapsedNavbarState = {
  open: false,
};

interface CollapsedNavbarProps {
  menus: MenuItem[];
  user: UserToken | null;
}

const CollapsedNavbar = (props: CollapsedNavbarProps) => {
  const menus = props.menus;
  const [state, setState] = useState(initialState);

  const closeNavbar = useCallback(() => {
    setState((state) => ({
      ...state,
      open: false,
    }));
  }, []);

  return (
    <>
      <Drawer open={state.open} onClose={closeNavbar} className="collapsed-nav">
        <div className="nav-logo">
          <img src="/images/logo-transparent.png" alt="logo" />
        </div>
        <List>
          {menus.map((m) => {
            if (!m.needConnection || (m.needConnection && props.user != null)) {
              return (
                <ListItem onClick={closeNavbar} key={`c_nav_${m.text}`}>
                  <ListItemText>
                    <Link to={m.link}>{m.text}</Link>
                  </ListItemText>
                </ListItem>
              );
            }
          })}
          {props.user == null ? (
            <ListItem onClick={closeNavbar}>
              <ListItemText>
                <Link to="/login" className="link" key={`nav_login`}>
                  Se connecter
                </Link>
              </ListItemText>
            </ListItem>
          ) : (
            <>
              <div className="link flex">
                <Avatar className="div-primary">
                  {props.user.email.split("")[0].toUpperCase()}
                </Avatar>
                <span className="username">{props.user.email}</span>
              </div>
              <div className="link">
                <Link to="" className="logout-link" key={`nav_login`}>
                  <LogoutIcon />
                </Link>
              </div>
            </>
          )}
        </List>
      </Drawer>
      <AppBar position="fixed">
        <div className="collapse-bar">
          <IconButton
            onClick={() =>
              setState((state) => ({
                ...state,
                open: !state.open,
              }))
            }
          >
            <MenuIcon />
          </IconButton>
          <div className="nav-logo">
            <img src="/images/logo-transparent.png" alt="logo" />
          </div>
          <div className="nav-links">
            {props.user == null ? (
              <ListItem onClick={closeNavbar}>
                <ListItemText>
                  <Link to="/login" className="link" key={`nav_login`}>
                    Se connecter
                  </Link>
                </ListItemText>
              </ListItem>
            ) : (
              <div className="link flex">
                <div>
                  <Avatar className="div-primary">
                    {props.user.email.split("")[0].toUpperCase()}
                  </Avatar>
                </div>
                <Link to="/login" className="logout-link" key={`nav_login`}>
                  <LogoutIcon />
                </Link>
              </div>
            )}
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default CollapsedNavbar;
