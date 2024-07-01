import React, { useState } from "react";
import AdminTabs from "../AdminTabs/AdminTabs";
import { Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

function Admin() {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h2" className={classes.heading}>
        Admin
      </Typography>
      <AdminTabs />
    </Container>
  );
}

export default Admin;
