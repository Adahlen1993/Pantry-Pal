import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import "./UserIngredientsTable.css";

function UserIngredientsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_INGREDIENTS" });
  }, [dispatch]);
  const userIngredients = useSelector((store) => store.userIngredients);
  console.log(userIngredients);
  const [heading, setHeading] = useState("Functional Component");

  function handleDelete(ingId) {
    console.log(ingId);
    dispatch({ type: "DELETE_INGREDIENT", payload: { ingredients_id: ingId } });
  }

  return (
    <Container className="table-con">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Your Ingredients</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userIngredients.length === 0 ? (
                  <TableRow>
                    <TableCell>No Ingredients</TableCell>
                  </TableRow>
                ) : (
                  userIngredients.map((uI) => (
                    <TableRow key={uI.id}>
                      <TableCell className="raleway-td-uing">
                        {uI.name}
                      </TableCell>
                      <TableCell className="raleway-td-uing">
                    
                        <IconButton  onClick={() => handleDelete(uI.user_ing_id)} aria-label="delete" size="large">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserIngredientsTable;
