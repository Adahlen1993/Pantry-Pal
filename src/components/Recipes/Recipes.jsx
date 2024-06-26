import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import defaultpic from "./defaultpic/defaultpic_copy.png";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_RECIPES" });
  }, []);
  const recipes = useSelector((store) => store.recipes);
  const [heading, setHeading] = useState("Functional Component");

  function displayRecipe(id) {
    dispatch({ type: "FETCH_RECIPE_PAGE" });
    history.push(`recipe/${id}`);
  }

  return (
    <div>
      {recipes.length === 0 ? (
        <h2>Add Ingredients</h2>
      ) : (
        recipes.map((recipe) => (
          <Card key={recipe.id} style={{ width: "18rem" }}>
            {!recipe.image ? (
              <Card.Img variant="top" src={defaultpic} />
            ) : (
              <Card.Img variant="top" src={recipe.image} />
            )}
            <Card.Body>
              <Card.Title>{recipe.recipe_name}</Card.Title>
              <Card.Text></Card.Text>
              <Button
                onClick={() => displayRecipe(recipe.id)}
                variant="primary"
              >
                Open Recipe
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default Recipes;
