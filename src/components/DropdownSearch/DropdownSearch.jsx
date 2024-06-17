import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import './DropdownSearch.css';


export default function DropdownSearch () {
const [selectIngredient, setSelectIngredient] = useState({});
const ingredients = useSelector((store) => store.ingredients);
const dispatch = useDispatch();
console.log(selectIngredient);

console.log('ingredients', ingredients)

const handleSubmit = e => {
    e.preventDefault();
    dispatch({type: 'ADD_INGREDIENT', payload: selectIngredient})
    
}

useEffect(() => {
    dispatch({type: 'FETCH_INGREDIENTS'})
 }, []);

    // return (
    //     <>
    //         <select
    //   value={selectIngredient} // ...force the select's value to match the state variable...
    //   onChange={e => setSelectIngredient(e.target.value)} // ... and update the state variable on any change!
    // >
    //      {ingredients.map((ingredient, i) => <option value={ingredient.name}>{ingredient.name}</option>)}
   
    
    // </select>
    //     </>
    // )
   
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
          <Select className='search-bar'
            options={ingredients.map(ingredient => ({ label: ingredient.name, value: ingredient.id }))}
            onChange={opt => setSelectIngredient({id:opt.value, label:opt.label})}
            
          />
          <button>Submit</button>
          </form>
        </div>
      );



}