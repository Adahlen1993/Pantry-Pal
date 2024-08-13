import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import defaultpic from "../defaultpicspoon/defaultpic_copy.png";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  content: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  heading: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

function Recipes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const recipes = useSelector((store) => store.recipesSpoonReducer);
  console.log('Recipes from reducer:', recipes);

  function displayRecipe(id) {
    dispatch({ type: "FETCH_RECIPE_PAGE" });
    history.push(`recipe/${id}`);
  }

  return (
    <Container className={classes.container}>
      {recipes.length === 0 ? (
        <Typography variant="h2" className={classes.heading}>
          Add Ingredients
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={recipe.image ? recipe.image : defaultpic}
                  alt={recipe.title}
                />
                <CardContent className={classes.content}>
                  <Typography variant="h5" component="div">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Used Ingredients: {recipe.usedIngredientCount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Missed Ingredients: {recipe.missedIngredientCount}
                  </Typography>
                  <Button
                    onClick={() => displayRecipe(recipe.id)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Open Recipe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Recipes;
