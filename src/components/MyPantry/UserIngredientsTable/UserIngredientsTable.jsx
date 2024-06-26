import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserIngredientsTable.css';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserIngredientsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_INGREDIENTS" });
  }, []);
  const userIngredients = useSelector((store) => store.userIngredients);
  console.log(userIngredients);
  const [heading, setHeading] = useState("Functional Component");

  function handleDelete(ingId) {
    console.log(ingId);
    dispatch({ type: "DELETE_INGREDIENT", payload: { ingredients_id: ingId } });
  }

  return (
    <div>
      <Container className="table-con">
        <Row>

        <Table striped bordered >
          <thead>
            <tr>
              <th className="raleway-th-uing">Your Ingredients</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {userIngredients.length === 0 ? (
                <tr>
                <td>No Ingredients</td>
              </tr>
            ) : (
                userIngredients.map((uI) => (
                    <tr key={uI.id}>
                  <td className="raleway-td-uing">
                    {uI.name} 
                  </td>
                  <td className="raleway-td-uing">
                    <Button size="sm" className="btn-uing-delete" variant="danger" onClick={() => handleDelete(uI.user_ing_id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
              )}
          </tbody>
        </Table>
            </Row>
      </Container>
    </div>
  );
}

export default UserIngredientsTable;
