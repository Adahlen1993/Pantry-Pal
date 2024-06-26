import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function RecipePage() {
    const history = useHistory();
    const id = useParams();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const recipe = useSelector((store) => store.recipePage);
  console.log(recipe);
  const [heading, setHeading] = useState('Functional Component');
  const returnHandler = () => (history.push('/recipes'));
  

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'FETCH_RECIPE_PAGE', payload: id })
     }, []);

  return (
    <>
    <button onClick={returnHandler}>Return</button>
    <div>
      <h2>{recipe.recipe_name}</h2>
      <div>
        <h5>
          Preparation Time: {recipe.preptime}
          Wait Time: {recipe.waittime}
          Cook Time: {recipe.cooktime}
        </h5>
      </div>
      <div>
        <h4>
          {recipe.recipe_ingredients_list}
        </h4>
      </div>
      <div>
        <h4>
          {recipe.instructions}
        </h4>
      </div>
    </div>
    </>
  );
}

export default RecipePage;
