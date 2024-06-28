import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import '../../App/App.css';

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
  timeBox: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
    backgroundColor: 'white',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
  },
  timeItem: {
    flex: '1 1 30%',
    textAlign: 'center',
    margin: theme.spacing(1),
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
  }, [dispatch, id]);

  return (
    <div className='watermark'>
    <Container className={classes.container}>
      <Button variant="contained" color="primary" onClick={returnHandler} className={classes.button}>
        Return
      </Button>
      <Box>
        <Typography variant="h2" gutterBottom>
          {recipe.recipe_name}
        </Typography>
        <Divider variant="middle" component="h2" />
        <Box className={classes.timeBox}>
          <Typography variant="h5" component="div" className={classes.timeItem}>
            Preparation Time: {recipe.preptime}
          </Typography>
          <Typography variant="h5" component="div" className={classes.timeItem}>
            Wait Time: {recipe.waittime}
          </Typography>
          <Typography variant="h5" component="div" className={classes.timeItem}>
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
        <Divider variant="middle" component="h4" />
        <Box className={classes.section}>
          <Typography variant="h4" component="div">
            Instructions:
          </Typography>
          <Typography variant="body1" component="div" className={classes.instructions}>
            {recipe.instructions}
          </Typography>
        </Box>
        <Divider variant="middle" component="h4" />
      </Box>
    </Container>
    </div>
  );
}

export default RecipePage;
