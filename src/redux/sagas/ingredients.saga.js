import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchIngredients(action) {
  try {
    const response = yield axios.get('/api/ingredients', action.payload);
    yield put({ type: 'SET_INGREDIENTS', payload: response.data });
  } catch (error) {
    console.error(`Error getting ingredient`);
  }
}

function* addIngredient(action) {
   try {
      yield axios.post('/api/ingredients', action.payload);
      yield put({type: 'FETCH_USER_INGREDIENTS'})
   }  catch (error) {
      console.error(`Error adding new ingredient`);
    }
}

function* ingredientsSaga() {
  yield takeLatest('FETCH_INGREDIENTS', fetchIngredients);
  yield takeLatest('ADD_INGREDIENT', addIngredient);
}

export default ingredientsSaga;