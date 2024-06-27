import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import defaultpic from '../defaultpic/defaultpic_copy.png';

function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_RECIPES' });
  }, [dispatch]);
  
  const recipes = useSelector((store) => store.recipes);
  const [heading, setHeading] = useState('Functional Component');

  function displayRecipe(id) {
    dispatch({ type: 'FETCH_RECIPE_PAGE' });
    history.push(`recipe/${id}`);
  }

  return (
    <Container>
      {recipes.length === 0 ? (
        <Typography variant="h2">Add Ingredients</Typography>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image || defaultpic}
                  alt={recipe.recipe_name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {recipe.recipe_name}
                  </Typography>
                  <Button
                    onClick={() => displayRecipe(recipe.id)}
                    variant="contained"
                    color="primary"
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

