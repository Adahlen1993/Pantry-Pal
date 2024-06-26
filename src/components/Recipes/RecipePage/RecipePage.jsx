
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function RecipePage() {
  const history = useHistory();
  const id  = useParams();
  const recipe = useSelector((store) => store.recipePage);
  const dispatch = useDispatch();

  const [heading, setHeading] = useState('Functional Component');

  const returnHandler = () => history.push('/recipes');

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_RECIPE_PAGE', payload: id });
  // }, [dispatch, id]);
  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_PAGE', payload: id })
 }, []);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={returnHandler} sx={{ mb: 2 }}>
        Return
      </Button>
      <Box>
        <Typography variant="h2" gutterBottom>
          {recipe.recipe_name}
        </Typography>
        <Box mb={2}>
          <Typography variant="h5" component="div">
            Preparation Time: {recipe.preptime}
          </Typography>
          <Typography variant="h5" component="div">
            Wait Time: {recipe.waittime}
          </Typography>
          <Typography variant="h5" component="div">
            Cook Time: {recipe.cooktime}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4" component="div">
            Ingredients:
          </Typography>
          <Typography variant="body1" component="div">
            {recipe.recipe_ingredients_list}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4" component="div">
            Instructions:
          </Typography>
          <Typography variant="body1" component="div">
            {recipe.instructions}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default RecipePage;

