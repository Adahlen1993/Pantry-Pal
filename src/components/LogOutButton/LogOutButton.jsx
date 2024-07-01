import React from "react";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(2),
    color: "inherit",
  },
}));

function LogOutButton({ onClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    if (onClick) onClick();
  };

  return (
    <MenuItem onClick={logOut} className={classes.button}>
      Log Out
    </MenuItem>
  );
}

export default LogOutButton;
