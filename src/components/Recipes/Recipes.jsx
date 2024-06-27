import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import SortRecipesButtons from './SortRecipesButtons/SortRecipesButtons';
import RecipeCards from './RecipeCards/RecipeCards';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Recipes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
<>
<SortRecipesButtons/>
<RecipeCards/>
</>
  );
}

export default Recipes;
