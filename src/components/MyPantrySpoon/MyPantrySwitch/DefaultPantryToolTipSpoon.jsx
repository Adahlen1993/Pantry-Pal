import React, { useState, useEffect } from "react";
import axios from "axios";
import { defaultPantry } from "./defaultPantry"; 
import { useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.h4.fontFamily,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1),
  },
}));

function IngredientList() {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientIds = defaultPantry.ingredient_ids.join(",");
        const response = await axios.get(
          `/api/ingredients/tooltip?ids=${ingredientIds}`
        );
        setIngredients(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return (
      <Container className={classes.container}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={classes.container}>
        <Typography color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Default Pantry Includes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/mypantry")}
        className={classes.button}
      >
        Return
      </Button>
      <List className={classes.list}>
        {ingredients.map((ingredient) => (
          <ListItem key={ingredient.id} className={classes.listItem}>
            {ingredient.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default IngredientList;
