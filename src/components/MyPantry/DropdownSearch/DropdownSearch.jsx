import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import kitchenIcon from './kitchen_icon.png';
// import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import {
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  ButtonContent,
  Button,
  Icon,
} from "semantic-ui-react";

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
        <Grid centered >
          <GridRow className="gridrow-search">
            {/* <GridColumn width={8}> */}
              {/* <Stack direction="horizontal" gap={2}> */}
              <Select
                selection
                search
                fluid
                
                className="raleway-search-bar"
                options={ingredients.map((ingredient) => ({
                  label: ingredient.name,
                  value: ingredient.id,
                }))}
                onChange={(opt) =>
                  setSelectIngredient({ id: opt.value, label: opt.label })
                  
                }
              />
            {/* </GridColumn> */}
            </GridRow>

            <GridRow className="gridrow-button">
              {/* <Button className="submitbutton">Submit</Button> */}
              {/* <GridColumn width={4}> */}

              <Button animated className="dropdown-search-btn">
                <ButtonContent visible>Add To Pantry</ButtonContent>
                <ButtonContent hidden>
                  <Icon name="shopping basket" />
                </ButtonContent>
              </Button>
              {/* </Stack> */}
              {/* </GridColumn> */}
          </GridRow>
        </Grid>
      </form>
    </div>
  );
}
