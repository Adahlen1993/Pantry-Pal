import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function AdminRecipesTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_RECIPES" });
    dispatch({ type: "FETCH_RECIPE_TYPE" });
  }, []);
  const recipes = useSelector((store) => store.allRecipesReducer);
  const type = useSelector((store) => store.recipeTypeReducer);
  const [recipeName, setRecipeName] = useState("");
  const [recipeType, setRecipeType] = useState(0);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeLikes, setRecipeLikes] = useState("");
  const [recipeUserCreated, setRecipeUserCreated] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipePreptime, setRecipePreptime] = useState("");
  const [recipeWaittime, setRecipeWaittime] = useState("");
  const [recipeCooktime, setRecipeCooktime] = useState("");
  const [recipeIngredientsList, setRecipeIngredientsList] = useState("");
  const [clickedRecipe, setClickedRecipe] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        id: clickedRecipe,
        recipe_name: recipeName,
        recipe_type: recipeType,
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
  };
  const handleCancel = () => {
    setShow(false);
  };
  const handleShow = (recipe) => {
    setShow(true);
    if (!recipe.description) {
      setRecipeDescription("None");
    }
    setRecipeIngredientsList(recipe.recipe_ingredients_list);
    setRecipeInstructions(recipe.instructions);
    setRecipeLikes(recipe.likes);
    if (!recipe.image) {
      setRecipeImage("None");
    }
    if (!recipe.type) {
      setRecipeType(0);
    }
    setRecipePreptime(recipe.preptime);
    setRecipeCooktime(recipe.cooktime);
    setRecipeWaittime(recipe.waittime);

      setRecipeUserCreated(recipe.user_id)
    setRecipeName(recipe.recipe_name);
    setClickedRecipe(recipe.id);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Instructions</th>
            <th>Likes</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>Wait Time</th>
            <th>User Created</th>
            <th>Image</th>
            <th>Ingredients list</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr onClick={() => handleShow(recipe)} key={recipe.id}>
              <td>{recipe.recipe_name}</td>
              {!recipe.type ? <td>None</td> : <td>{recipe.type}</td>}
              {!recipe.description ? (
                <td>None</td>
              ) : (
                <td>{recipe.description}</td>
              )}
              <td>{recipe.instructions}</td>
              <td>{recipe.likes}</td>
              <td>{recipe.preptime}</td>
              <td>{recipe.cooktime}</td>
              <td>{recipe.waittime}</td>
              {!recipe.user_id ? <td>0</td> : <td>{recipe.user_id}</td>}
              {!recipe.image ? <td>None</td> : <td>{recipe.image}</td>}
              <td>{recipe.recipe_ingredients_list}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingLikes"
            label="Likes"
            className="mb-3"
          >
            <Form.Control
              value={recipeLikes}
              onChange={(e) => setRecipeLikes(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserCreated"
            label="User Id"
            className="mb-3"
          >
            <Form.Control
              value={recipeUserCreated}
              onChange={(e) => setRecipeUserCreated(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingImage"
            label="Image"
            className="mb-3"
          >
            <Form.Control
              value={recipeImage}
              onChange={(e) => setRecipeImage(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPrepTime"
            label="Preparation Time"
            className="mb-3"
          >
            <Form.Control
              value={recipePreptime}
              onChange={(e) => setRecipePreptime(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingCookTime"
            label="Cook Time"
            className="mb-3"
          >
            <Form.Control
              value={recipeCooktime}
              onChange={(e) => setRecipeCooktime(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingWaitTime"
            label="Wait Time"
            className="mb-3"
          >
            <Form.Control
              value={recipeWaittime}
              onChange={(e) => setRecipeWaittime(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingIngredientsList"
            label="Ingredients List"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              value={recipeIngredientsList}
              onChange={(e) => setRecipeIngredientsList(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInstructions"
            label="Instructions"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
            />
          </FloatingLabel>

          <DropdownButton id="dropdown-basic-button" title="Recipe Type">
            {type.map((t) => (
              <Dropdown.Item key={t.id} onClick={() => setRecipeType(t.id)}>
                {t.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
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
  );
}

export default AdminRecipesTable;
