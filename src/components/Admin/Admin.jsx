import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTabs from '../AdminTabs/AdminTabs';
import { Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

function TemplateFunction(props) {
  const classes = useStyles();
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <Container>
      <Typography variant="h2" className={classes.heading}>
        Admin
      </Typography>
      <AdminTabs />
    </Container>
  );
}

export default TemplateFunction;
