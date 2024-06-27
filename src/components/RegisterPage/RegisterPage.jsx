import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RegisterForm from '../RegisterForm/RegisterForm';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.container}>
      <RegisterForm />
      <Box mt={2} textAlign="center">
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterPage;
