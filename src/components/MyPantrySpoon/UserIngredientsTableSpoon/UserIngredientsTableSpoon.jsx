import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeadCell: {
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "2rem",
    textShadow: `
      1px 1px 0 white, 
      -1px -1px 0 white, 
      -1px 1px 0 white, 
      1px -1px 0 white, 
      1px 0 0 white, 
      -1px 0 0 white, 
      0 1px 0 white, 
      0 -1px 0 white
    `,
  },
  tableCell: {
    fontFamily: theme.typography.fontFamily,
  },
  noIngredients: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

function UserIngredientsTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userIngredients = useSelector((store) => store.userIngredients);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_INGREDIENTS" });
  }, [dispatch]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (ingId) => {
    console.log(ingId);
    dispatch({ type: "DELETE_INGREDIENT", payload: { ingredients_id: ingId } });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Your Ingredients
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userIngredients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className={classes.noIngredients}>
                      No Ingredients
                    </TableCell>
                  </TableRow>
                ) : (
                  userIngredients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((uI) => (
                      <TableRow key={uI.id}>
                        <TableCell className={classes.tableCell}>
                          {uI.name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <IconButton
                            onClick={() => handleDelete(uI.user_ing_id)}
                            aria-label="delete"
                            size="large"
                            className={classes.deleteButton}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={userIngredients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserIngredientsTable;
