import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserIngredientsTable() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'FETCH_USER_INGREDIENTS'})
     }, []);
  const userIngredients = useSelector((store) => store.userIngredients);
  console.log(userIngredients)
  const [heading, setHeading] = useState('Functional Component');

     function handleDelete(ingId) {
        console.log(ingId)
        dispatch({type: 'DELETE_INGREDIENT', payload: {ingredients_id: ingId} })
     }

  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>Your Ingredients</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                {userIngredients.length === 0 ? <tr><td>No Ingredients</td></tr> : userIngredients.map((uI) => <tr key={uI.id}><td>{uI.name}</td><td><button onClick={()=> handleDelete(uI.user_ing_id)} >Delete</button></td></tr>)}
               
                
            </tbody>
        </table>
    
    </div>
  );
}

export default UserIngredientsTable;
