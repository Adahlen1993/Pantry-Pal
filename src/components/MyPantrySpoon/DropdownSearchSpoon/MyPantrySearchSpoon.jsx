import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  button: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      marginTop: 0,
      marginLeft: theme.spacing(2),
    },
  },
}));

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FreeSoloSpoon() {
  const classes = useStyles();
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [selectIngredient, setSelectIngredient] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const ingredients = useSelector((store) => store.ingredientsSpoonReducer);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectIngredient) {
      dispatch({ type: "ADD_INGREDIENT", payload: selectIngredient });
      dispatch({ type: "FETCH_RECIPES" });
      handleSnackbarOpen(`Ingredient "${selectIngredient.name}" added!`);
      setSelectIngredient(null);
      setInputValue("");
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS_SPOON" });
  }, [dispatch]);

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        alignItems={isMobile ? "stretch" : "center"}
      >
        <Autocomplete
          fullWidth
          freeSolo
          id="free-solo-2-demo"
          options={ingredients}
          getOptionLabel={(option) => option.name}
          filterOptions={filterOptions}
          value={selectIngredient}
          onChange={(event, newValue) => {
            setSelectIngredient(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find Ingredients"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size={isMobile ? "large" : "medium"}
          className={classes.button}
          fullWidth={isMobile}
        >
          Submit
        </Button>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
