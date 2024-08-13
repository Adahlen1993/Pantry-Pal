import React from "react";
import { useSelector } from "react-redux";
import SortRecipesButtons from "./SortRecipesButtonsSpoon/SortRecipesButtonsSpoon";
import RecipeCardsSpoon from "./RecipeCardsSpoon/RecipeCardsSpoon";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontFamily: "Kurale, serif",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function Recipes() {
  const classes = useStyles();
  const store = useSelector((store) => store);

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.heading}>
        Recipes
      </Typography>
      <Box className={classes.content}>
        <SortRecipesButtons />
        <RecipeCardsSpoon />
      </Box>
    </Container>
  );
}

export default Recipes;
