
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { defaultPantry } from './defaultPantry';

function MyPantrySwitch() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [pantrySwitch, setPantrySwitch] = useState(false);

  useEffect(() => {
    if (user.default_pantry === true) {
      setPantrySwitch(true);
    }
  }, [user.default_pantry]);

  const addStandardIngredients = () => {
    const newSwitchState = !pantrySwitch;
    setPantrySwitch(newSwitchState);

    if (newSwitchState === true) {
      dispatch({ type: 'UPDATE_DEFAULT_PANTRY_TRUE', payload: { default_pantry: true } });
      axios
        .post('/api/user/ingredients/default', { user_id: user.id, ingredient_id: defaultPantry.ingredient_ids })
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          dispatch({type: 'FETCH_USER_INGREDIENTS'})
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    } else {
      dispatch({ type: 'UPDATE_DEFAULT_PANTRY_FALSE', payload: { default_pantry: false } });
      deleteDefaultPantry(defaultPantry);
    }
  };

  const deleteDefaultPantry = async (defaultPantry) => {
    try {
      const response = await axios.delete('/api/user/ingredients/default', {
        data: {
          user_id: user.id,
          ingredient_ids: defaultPantry.ingredient_ids,
        },
      });

      if (response.status === 200) {
        console.log('Ingredients deleted successfully');
        dispatch({type: 'FETCH_USER_INGREDIENTS'})
      }
    } catch (error) {
      console.error('Error deleting ingredients', error);
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={pantrySwitch} onChange={addStandardIngredients} />}
      label="Set Default Pantry"
    />
  );
}

export default MyPantrySwitch;
