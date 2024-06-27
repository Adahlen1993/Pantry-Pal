import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

export default function AdminIngredientsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' });
  }, [dispatch]);

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientUser, setIngredientUser] = useState(false);
  const [ingredientId, setIngredientId] = useState(0);
  const [show, setShow] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: 'UPDATE_INGREDIENTS',
      payload: {
        id: ingredientId,
        name: ingredientName,
        user_id: ingredientUser,
      },
    });
  };
  const handleCancel = () => {
    setShow(false);
  };
  const handleShow = (ingredient) => {
    setShow(true);
    setIngredientName(ingredient.name);
    setIngredientUser(ingredient.user_id);
    setIngredientId(ingredient.id);
  };

  const handleDelete = (ingId) => {
    dispatch({ type: 'DELETE_INGREDIENT_ADMIN', payload: { ingredients: ingId } });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ingredients = useSelector((store) => store.ingredients);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, ingredients.length - page * rowsPerPage);

  return (
    <>
      {/* <AdminDropdownSearch /> */}
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingredients Name</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>No Ingredients</TableCell>
                </TableRow>
              ) : (
                ingredients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((uI) => (
                    <TableRow onClick={() => handleShow(uI)} key={uI.id}>
                      <TableCell>{uI.name}</TableCell>
                      <TableCell>{uI.user_id || 0}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(uI.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={ingredients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={show} onClose={handleCancel}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="User Id"
              fullWidth
              value={ingredientUser}
              onChange={(e) => setIngredientUser(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
