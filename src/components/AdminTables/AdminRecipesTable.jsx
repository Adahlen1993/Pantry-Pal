import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';


function AdminRecipesTable() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({ type: "FETCH_ALL_RECIPES" });
    }, []);
  const recipes = useSelector((store) => store.allRecipesReducer);
  

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Type
                </th>
                <th>
                    Description
                </th>
                <th>
                    Instructions
                </th>
                <th>
                    Likes
                </th>
                <th>
                    User Created
                </th>
                <th>
                    Image
                </th>
                <th>
                    Ingredients list
                </th>
                
            </tr>
        </thead>
        <tbody>
            {recipes.map(recipe => (
                <tr key={recipe.id}>
                    <td>{recipe.recipe_name}</td>
                    <td>{recipe.type}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.instructions}</td>
                    <td>{recipe.likes}</td>
                    <td>{recipe.user_id}</td>
                    <td>{recipe.image}</td>
                    <td>{recipe.recipe_ingredients_list}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRecipesTable;