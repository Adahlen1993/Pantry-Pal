import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipes(action) {
  try {
    const response = yield axios.get('/api/recipes');
    yield put({ type: 'SET_RECIPES', payload: response.data });
  } catch (error) {
    console.error(`Error getting recipes`);
  }
}

function* fetchAllRecipes(action) {
  try {
    const response = yield axios.get('/api/recipes/all');
    yield put({ type: 'SET_RECIPES', payload: response.data });
  } catch (error) {
    console.error(`Error getting all recipes`);
  }
}

function* fetchFilteredRecipes(action) {
  try {
    const { userId, recipeType } = action.payload;
    const response = yield axios.get('/api/recipes/filtered', {
      params: { userId, recipeType },
    });
    yield put({ type: 'SET_RECIPES', payload: response.data });
  } catch (error) {
    console.error(`Error getting filtered recipes`);
  }
}

function* addRecipes(action) {
  try {
    yield axios.post('/api/recipes', action.payload);
    yield put({ type: 'FETCH_RECIPES' });
  } catch (error) {
    console.error(`Error adding new recipe`);
  }
}

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('ADD_RECIPES', addRecipes);
  yield takeLatest('FETCH_ALL_RECIPES', fetchAllRecipes);
  yield takeLatest('FETCH_FILTERED_RECIPES', fetchFilteredRecipes);
}

export default recipesSaga;
