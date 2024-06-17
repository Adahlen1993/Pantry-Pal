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
      yield console.log(action.payload);
      yield axios.delete('/api/user/ingredients', {data: action.payload});
      yield put({type: 'FETCH_USER_INGREDIENTS'})
   }  catch (error) {
      console.error(`Error deleting  new ingredient`);
    }
}

function* userIngredientsSaga() {
  yield takeLatest('FETCH_USER_INGREDIENTS', fetchUserIngredients);
  yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
}

export default userIngredientsSaga;