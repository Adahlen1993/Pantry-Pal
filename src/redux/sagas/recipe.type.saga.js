import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchRecipeType(action) {
  try {
    const response = yield axios.get('/api/recipetype');
    yield put({ type: 'SET_RECIPE_TYPE', payload: response.data });
  } catch (error) {
    console.error(`Error getting recipe`);
  }
}


function* addRecipes(action) {
   try {
      yield axios.post('/api/recipes/all', action.payload);
      yield put({type: 'FETCH_ALL_RECIPES'})
   }  catch (error) {
      console.error(`Error adding new recipe`);
    }
}

function* recipeTypeSaga() {

  yield takeLatest('FETCH_RECIPE_TYPE', fetchRecipeType)
}

export default recipeTypeSaga;