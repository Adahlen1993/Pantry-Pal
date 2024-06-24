import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDropdownSearch from "../AdminDropdownSearch/AdminDropdownSearch";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

export default function AdminIngredientsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS" });
  }, []);

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientUser, setIngredientUser] = useState(false);
  const [ingredientId, setIngredientId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: "UPDATE_INGREDIENTS",
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

  function handleDelete(ingId) {
    console.log(ingId);
    dispatch({ type: "DELETE_INGREDIENT_ADMIN", payload: { ingredients: ingId } });
  }
  const ingredients = useSelector((store) => store.ingredients);

  return (
    <>
      <AdminDropdownSearch />
      <div>
        <table>
          <thead>
            <tr>
              <th>Ingredients Name</th>
              <th>User Id</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.length === 0 ? (
              <tr>
                <td>No Ingredients</td>
              </tr>
            ) : (
              ingredients.map((uI) => (
                <tr onClick={() => handleShow(uI)} key={uI.id}>
                  <td>{uI.name} </td>
                  <td>{uI.user_id}</td>
                  <td>
                    <button onClick={() => handleDelete(uI.user_ing_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingUser"
            label="User Id"
            className="mb-3">
              <Form.Control
                value={ingredientUser}
                onChange={(e) => setIngredientUser(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
