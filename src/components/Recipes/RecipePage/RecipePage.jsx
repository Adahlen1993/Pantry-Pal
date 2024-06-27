import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  ingredients: {
    whiteSpace: 'pre-line', // To handle new lines in ingredients list
  },
  instructions: {
    whiteSpace: 'pre-line', // To handle new lines in instructions
  },
}));

function RecipePage() {
  const classes = useStyles();
  const history = useHistory();
  const  id  = useParams();
  const recipe = useSelector((store) => store.recipePage);
  const dispatch = useDispatch();

  const returnHandler = () => history.push('/recipes');

  useEffect(() => {
    dispatch({ type: 'FETCH_RECIPE_PAGE', payload: id });
  }, []);

  return (
    <Container className={classes.container}>
      <Button variant="contained" color="primary" onClick={returnHandler} className={classes.button}>
        Return
      </Button>
      <Box>
        <Typography variant="h2" gutterBottom>
          {recipe.recipe_name}
        </Typography>
        <Box className={classes.section}>
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
        <Box className={classes.section}>
          <Typography variant="h4" component="div">
            Ingredients:
          </Typography>
          <Typography variant="body1" component="div" className={classes.ingredients}>
            {recipe.recipe_ingredients_list}
          </Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant="h4" component="div">
            Instructions:
          </Typography>
          <Typography variant="body1" component="div" className={classes.instructions}>
            {recipe.instructions}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default RecipePage;
