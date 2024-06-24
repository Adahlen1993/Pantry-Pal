import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchAllRecipes(action) {
  try {
    const response = yield axios.get('/api/recipes/all');
    yield put({ type: 'SET_ALL_RECIPES', payload: response.data });
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

function* allRecipesSaga() {

  yield takeLatest('FETCH_ALL_RECIPES', fetchAllRecipes)
}

export default allRecipesSaga;