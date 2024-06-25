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
// function* fetchSearchIngredients(action) {
//   try {
//      yield axios.put(`/api/ingredients/search`, action.payload);
//      yield console.log(response.data);
//      yield put({type: 'SET_SEARCH_INGREDIENTS'})
//   }  catch (error) {
//      console.error(`Error editing user`);
//    }
// }
function* editIngredients(action) {
  try {
     yield axios.put(`/api/ingredients`, action.payload);
     yield put({type: 'FETCH_INGREDIENTS'})
  }  catch (error) {
     console.error(`Error editing user`);
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
  yield takeLatest('UPDATE_INGREDIENTS', editIngredients);
  // yield takeLatest('FETCH_SEARCH_INGREDIENTS', fetchSearchIngredients);
}

export default ingredientsSaga;