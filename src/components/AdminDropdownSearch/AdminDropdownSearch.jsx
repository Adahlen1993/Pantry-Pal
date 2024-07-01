import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import "./AdminDropdownSearch.css";

export default function AdminDropdownSearch() {
  const [selectIngredient, setSelectIngredient] = useState({});
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectIngredient.id);
    dispatch({
      type: "FETCH_SEARCH_INGREDIENTS",
      payload: selectIngredient.id,
    });
  };
  const clearSearch = () => {
    dispatch({ type: "FETCH_INGREDIENTS" });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS" });
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
        <button>Submit</button>
      </form>
      <button onClick={clearSearch}>Clear Search</button>
    </div>
  );
}
