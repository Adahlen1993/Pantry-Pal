import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

import "./DropdownSearch.css";

export default function DropdownSearch() {
  const [selectIngredient, setSelectIngredient] = useState({});
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  console.log(selectIngredient);

  console.log("ingredients", ingredients);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_INGREDIENT", payload: selectIngredient });
    dispatch({ type: "FETCH_RECIPES" });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS" });
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <Stack direction="horizontal" gap={3}>
          <Select
            className="search-bar"
            options={ingredients.map((ingredient) => ({
              label: ingredient.name,
              value: ingredient.id,
            }))}
            onChange={(opt) =>
              setSelectIngredient({ id: opt.value, label: opt.label })
            }
          />

          <Button className="submitbutton">Submit</Button>
        </Stack>
      </form>
    </div>
  );
}
