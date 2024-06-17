import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Recipes() {
const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'FETCH_RECIPES'}),
        dispatch({type: 'FETCH_USER_INGREDIENTS'})
     }, []);
     const recipes = useSelector((store) => store.recipes);
     const userIngredients = useSelector((store) => store.userIngredients);
     const [heading, setHeading] = useState('Functional Component');
 
  
  
  
  

   
  console.log('userIngredients',userIngredients);
  console.log('recipes', recipes);
      
  return (
    <div>
    <ul>
    
        
    {recipes.map((recipe, i) => <li key={i}>{recipe.recipe_name}{recipe.description}{recipe.instructions}</li>)}
    {/* {recipes.map((recipe, i) => <li key={i}>{recipe.recipe_name}{recipe.description}{recipe.instructions}</li>)} */}
    </ul>
    </div>
  );
}


export default Recipes;