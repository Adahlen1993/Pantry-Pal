import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogOutButton from '../LogOutButton/LogOutButton';
import { makeStyles } from '@mui/styles';
import '../App/App.css';
import justLogo from '../../../public/PantryPalJustLogo.png';
import justName from '../../../public/PantryPalJustName.png';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  linkButton: {
    marginLeft: theme.spacing(2),
  },
}));

function Nav() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/home" className={classes.title}>
          <img src={justLogo} alt='first' height={50} width={50}/><img alt='second' src={justName} height={50} width={180}/>
        </Typography>

        <Button component={RouterLink} to="/mypantry" color="inherit" className={classes.linkButton}>
          MyPantry
        </Button>
        <Button component={RouterLink} to="/recipes" color="inherit" className={classes.linkButton}>
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
            <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose}>
              Login / Register
            </MenuItem>
          ) : (
            [
              <MenuItem key="home" component={RouterLink} to="/user" onClick={handleMenuClose}>
                Home
              </MenuItem>,
              // <MenuItem key="info" component={RouterLink} to="/info" onClick={handleMenuClose}>
              //   Info Page
              // </MenuItem>,
              <LogOutButton key="logout" onClick={handleMenuClose} />,
            ]
          )}

          {user.admin && (
            <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
              Admin
            </MenuItem>
          )}

          {/* <MenuItem component={RouterLink} to="/about" onClick={handleMenuClose}>
            About
          </MenuItem> */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
