import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogOutButton from "../LogOutButton/LogOutButton";
import { makeStyles } from "@mui/styles";
import "../App/App.css";
import justLogo from "../../../public/PantryPalJustLogo.png";
import justName from "../../../public/PantryPalJustName.png";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
  name: {
    height: 50,
    width: 180,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  linkButton: {
    marginLeft: theme.spacing(2),
  },
}));



function Nav() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const userIngredients = useSelector((store) => store.userIngredients.map(ing => ing.name));


  function fetchRecipesSpoon() {
    dispatch({type:'FETCH_RECIPES_SPOON', payload: { ingredients: userIngredients } })
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Determine if the current path is login or register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          className={classes.title}
        >
          <img src={justLogo} alt="logo" className={classes.logo} />
          <img src={justName} alt="name" className={classes.name} />
        </Typography>

        {!isAuthPage && (
          <>
            {/* <Button
              component={RouterLink}
              to="/mypantry"
              color="inherit"
              className={classes.linkButton}
            >
              MyPantry
            </Button> */}
            <Button
              component={RouterLink}
              to="/mypantryspoon"
              color="inherit"
              className={classes.linkButton}
            >
              MyPantry Spoon
            </Button>
            <Button
              component={RouterLink}
              to="/recipes"
              color="inherit"
              className={classes.linkButton}
              onClick={fetchRecipesSpoon}
            >
              Recipes
            </Button>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user.id === null ? (
                <MenuItem
                  component={RouterLink}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login / Register
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    key="home"
                    component={RouterLink}
                    to="/user"
                    onClick={handleMenuClose}
                  >
                    Home
                  </MenuItem>
                  <LogOutButton key="logout" onClick={handleMenuClose} />
                </div>
              )}

              {user.admin && (
                <MenuItem
                  component={RouterLink}
                  to="/admin"
                  onClick={handleMenuClose}
                >
                  Admin
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
