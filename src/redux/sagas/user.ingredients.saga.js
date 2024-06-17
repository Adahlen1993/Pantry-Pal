import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserIngredients(action) {
    try {
      const response = yield axios.get('/api/user/ingredients');
      yield put({ type: 'SET_USER_INGREDIENTS', payload: response.data });
    } catch (error) {
      console.error(`Error getting user ingredients`);
    }
  }

function* deleteIngredient(action) {
   try {
      yield axios.delete('/api/user/ingredients', action.payload);
      yield put({type: 'FETCH_INGREDIENTS'})
   }  catch (error) {
      console.error(`Error adding new ingredient`);
    }
}

function* userIngredientsSaga() {
  yield takeLatest('FETCH_USER_INGREDIENTS', fetchUserIngredients);
  yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
}

export default userIngredientsSaga;