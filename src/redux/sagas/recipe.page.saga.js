import { put, takeLatest, call } from 'redux-saga/effects'; // Make sure 'call' is imported
import axios from 'axios';

function* fetchRecipePage(action) {
  try {
    const response = yield call(axios.get, `/api/recipe/${action.payload}`);
    yield put({ type: 'SET_RECIPE_PAGE', payload: response.data });
  } catch (error) {
    console.error('Error getting recipe', error);
    yield put({ type: 'SET_RECIPE_PAGE_ERROR', payload: error });
  }
}

function* recipePageSaga() {
  yield takeLatest('FETCH_RECIPE_PAGE', fetchRecipePage);
}

export default recipePageSaga;
