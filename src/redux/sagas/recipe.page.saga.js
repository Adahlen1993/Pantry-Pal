import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchRecipePage(action) {
    try {
      const response = yield axios.get(`/api/recipe/${action.payload.id}`);
      yield console.log('response', response.data);
      yield put({ type: 'SET_RECIPE_PAGE', payload: response.data });
    } catch (error) {
      console.error(`Error getting recipe`);
    }
  }
  function* recipePageSaga() {
    yield takeLatest('FETCH_RECIPE_PAGE', fetchRecipePage);
   
  }

  export default recipePageSaga;