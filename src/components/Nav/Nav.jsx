
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogOutButton from '../LogOutButton/LogOutButton';

function Nav() {
  const user = useSelector((store) => store.user);
  console.log('Nav user', user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/home" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          PantryPal
        </Typography>
        {/* If no user is logged in, show these links */}
        {user.id === null && (
          <Button component={RouterLink} to="/login" color="inherit">
            Login / Register
          </Button>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Button component={RouterLink} to="/user" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/info" color="inherit">
              Info Page
            </Button>
            <Button component={RouterLink} to="/recipes" color="inherit">
              Recipes
            </Button>
            <Button component={RouterLink} to="/mypantry" color="inherit">
              MyPantry
            </Button>
            <LogOutButton />
          </>
        )}

        {/* If a user is an admin, show these links */}
        {user.admin && (
          <Button component={RouterLink} to="/admin" color="inherit">
            Admin
          </Button>
        )}

        <Button component={RouterLink} to="/about" color="inherit">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
