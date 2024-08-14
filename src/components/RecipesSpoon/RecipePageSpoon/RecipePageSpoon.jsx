import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Container,
  Divider,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App/App.css";
import defaultpic from "../defaultpicspoon/defaultpic_copy.png";

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
    whiteSpace: "pre-line",
  },
  instructions: {
    whiteSpace: "pre-line",
  },
  timeBox: {
    display: "flex",
    justifyContent: "space-around",
    padding: theme.spacing(2),
    backgroundColor: "white",
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    flexWrap: "wrap",
  },
  timeItem: {
    flex: "1 1 30%",
    textAlign: "center",
    margin: theme.spacing(1),
  },
  media: {
    height: 300,
    marginBottom: theme.spacing(2),
  },
}));

function RecipePage() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((store) => store.recipePage.data);
  const error = useSelector((store) => store.recipePage.error);
  const loading = useSelector(
    (store) => !store.recipePage.data && !store.recipePage.error
  );

  const returnHandler = () => history.push("/recipes");

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_PAGE", payload: id });
  }, [dispatch, id]);

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
        <Typography variant="h6" color="error">
          Error loading recipe. Please try again.
        </Typography>
        <Button variant="contained" color="primary" onClick={returnHandler}>
          Return
        </Button>
      </Container>
    );
  }

  return (
    <div className="watermark">
      <Container className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={returnHandler}
          className={classes.button}
        >
          Return
        </Button>
        <CardMedia
          className={classes.media}
          image={recipe.image || defaultpic}
          title={recipe.title} // Updated from recipe_name to title
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {recipe.title} {/* Updated from recipe_name to title */}
          </Typography>
          <Divider variant="middle" component="h2" />
          <Box className={classes.timeBox}>
            <Typography
              variant="h5"
              component="div"
              className={classes.timeItem}
            >
              Preparation Time: {recipe.preparationMinutes || "N/A"} min
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className={classes.timeItem}
            >
              Cook Time: {recipe.cookingMinutes || "N/A"} min
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className={classes.timeItem}
            >
              Ready In: {recipe.readyInMinutes || "N/A"} min
            </Typography>
          </Box>
          <Box className={classes.section}>
            <Typography variant="h4" component="div">
              Ingredients:
            </Typography>
            <Typography
              variant="body1"
              component="div"
              className={classes.ingredients}
            >
              {recipe.extendedIngredients
                ? recipe.extendedIngredients
                    .map((ing) => `${ing.original}`)
                    .join("\n")
                : "No ingredients available"}
            </Typography>
          </Box>
          <Divider variant="middle" component="h4" />
          <Box className={classes.section}>
            <Typography variant="h4" component="div">
              Instructions:
            </Typography>
            <Typography
              variant="body1"
              component="div"
              className={classes.instructions}
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </Box>
          <Divider variant="middle" component="h4" />
        </Box>
      </Container>
    </div>
  );
}

export default RecipePage;
