import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "../LoginForm/LoginForm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.container}>
      <LoginForm />
      <Box mt={2} textAlign="center">
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
