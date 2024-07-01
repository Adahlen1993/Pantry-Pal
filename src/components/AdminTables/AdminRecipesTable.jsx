import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Box,
  Typography,
  TablePagination,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
  deleteButton: {
    zIndex: 1, // Ensure button click works properly even with row hover
  },
}));

function AdminRecipesTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_RECIPES' });
    dispatch({ type: 'FETCH_RECIPE_TYPE' });
  }, [dispatch]);

  const recipes = useSelector((store) => store.allRecipesReducer);
  const type = useSelector((store) => store.recipeTypeReducer);

  const [recipeName, setRecipeName] = useState('');
  const [recipeType, setRecipeType] = useState({ type_id: 0, type_name: '' });
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeLikes, setRecipeLikes] = useState(0);
  const [recipeUserCreated, setRecipeUserCreated] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipePreptime, setRecipePreptime] = useState(0);
  const [recipeWaittime, setRecipeWaittime] = useState(0);
  const [recipeCooktime, setRecipeCooktime] = useState(0);
  const [recipeIngredientsList, setRecipeIngredientsList] = useState('');
  const [clickedRecipe, setClickedRecipe] = useState('');
  const [show, setShow] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleClose = () => {
    setShow(false);
    if (addMode) {
      dispatch({
        type: 'ADD_RECIPE',
        payload: {
          recipe_name: recipeName,
          recipe_type: recipeType.type_id,
          description: recipeDescription,
          instructions: recipeInstructions,
          likes: recipeLikes,
          preptime: recipePreptime,
          cooktime: recipeCooktime,
          waittime: recipeWaittime,
          user_id: recipeUserCreated,
          image: recipeImage,
          recipe_ingredients_list: recipeIngredientsList,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_RECIPE',
        payload: {
          id: clickedRecipe,
          recipe_name: recipeName,
          recipe_type: recipeType.type_id,
          description: recipeDescription,
          instructions: recipeInstructions,
          likes: recipeLikes,
          preptime: recipePreptime,
          cooktime: recipeCooktime,
          waittime: recipeWaittime,
          user_id: recipeUserCreated,
          image: recipeImage,
          recipe_ingredients_list: recipeIngredientsList,
        },
      });
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleShow = (recipe) => {
    setAddMode(false);
    setShow(true);
    setRecipeDescription(recipe.description || 'None');
    setRecipeIngredientsList(recipe.recipe_ingredients_list);
    setRecipeInstructions(recipe.instructions);
    setRecipeLikes(recipe.likes);
    setRecipeImage(recipe.image || 'None');
    setRecipeType({ type_id: recipe.recipe_type || 0, type_name: type.find((t) => t.id === recipe.recipe_type)?.name || '' });
    setRecipePreptime(recipe.preptime);
    setRecipeCooktime(recipe.cooktime);
    setRecipeWaittime(recipe.waittime);
    setRecipeUserCreated(recipe.user_id || 0);
    setRecipeName(recipe.recipe_name);
    setClickedRecipe(recipe.id);
  };

  const handleAdd = () => {
    setAddMode(true);
    setShow(true);
    setRecipeName('');
    setRecipeType({ type_id: 0, type_name: '' });
    setRecipeDescription('');
    setRecipeInstructions('');
    setRecipeLikes(0);
    setRecipeUserCreated('');
    setRecipeImage('');
    setRecipePreptime(0);
    setRecipeWaittime(0);
    setRecipeCooktime(0);
    setRecipeIngredientsList('');
    setClickedRecipe('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, recipes.length - page * rowsPerPage);

  return (
    <div>
      <Grid container justifyContent="flex-end" style={{ marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Recipe
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Instructions</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Prep Time</TableCell>
              <TableCell>Cook Time</TableCell>
              <TableCell>Wait Time</TableCell>
              <TableCell>User Created</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Ingredients List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((recipe) => (
              <TableRow onClick={() => handleShow(recipe)} key={recipe.id} className={classes.tableRow}>
                <TableCell>{recipe.recipe_name}</TableCell>
                <TableCell>{type.find((t) => t.id === recipe.recipe_type)?.name || 'None'}</TableCell>
                <TableCell>{recipe.description || 'None'}</TableCell>
                <TableCell>{recipe.instructions}</TableCell>
                <TableCell>{recipe.likes}</TableCell>
                <TableCell>{recipe.preptime}</TableCell>
                <TableCell>{recipe.cooktime}</TableCell>
                <TableCell>{recipe.waittime}</TableCell>
                <TableCell>{recipe.user_id || 0}</TableCell>
                <TableCell>{recipe.image || 'None'}</TableCell>
                <TableCell>{recipe.recipe_ingredients_list}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={recipes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={show} onClose={handleCancel}>
        <DialogTitle>{addMode ? 'Add Recipe' : 'Edit Recipe'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Likes"
            fullWidth
            value={recipeLikes}
            onChange={(e) => setRecipeLikes(e.target.value)}
          />
          <TextField
            margin="dense"
            label="User Id"
            fullWidth
            value={recipeUserCreated}
            onChange={(e) => setRecipeUserCreated(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Image"
            fullWidth
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Preparation Time"
            fullWidth
            value={recipePreptime}
            onChange={(e) => setRecipePreptime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cook Time"
            fullWidth
            value={recipeCooktime}
            onChange={(e) => setRecipeCooktime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Wait Time"
            fullWidth
            value={recipeWaittime}
            onChange={(e) => setRecipeWaittime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Ingredients List"
            fullWidth
            multiline
            value={recipeIngredientsList}
            onChange={(e) => setRecipeIngredientsList(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Instructions"
            fullWidth
            multiline
            value={recipeInstructions}
            onChange={(e) => setRecipeInstructions(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Recipe Type</InputLabel>
            <Select
              value={recipeType.type_id}
              onChange={(e) =>
                setRecipeType({
                  type_id: e.target.value,
                  type_name: type.find((t) => t.id === e.target.value)?.name || '',
                })
              }
            >
              {type.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2}>
            <Typography variant="h6">Selected Type: {recipeType.type_name}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            {addMode ? 'Add Recipe' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminRecipesTable;
