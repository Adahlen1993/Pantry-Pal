import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  alert: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

function RegisterForm() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      // Redirect to /mypantry if user is logged in
      history.push("/mypantry");
    }
  }, [user, history]);

  const register = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "REGISTER",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "REGISTER_INPUT_ERROR" });
    }
  };

  return (
    <form className={classes.form} onSubmit={register}>
      <Typography variant="h5" component="h2" gutterBottom>
        Register
      </Typography>
      {errors.registrationMessage && (
        <Alert severity="error" className={classes.alert} role="alert">
          {errors.registrationMessage}
        </Alert>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className={classes.input}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className={classes.input}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
