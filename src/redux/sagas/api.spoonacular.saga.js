import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSprecipes(action) {
  try {
    const response = yield axios.get("/api/sprecipe");
    yield put({ type: "SET_SPRECIPES", payload: response.data });
  } catch (error) {
    console.error(`Error getting recipe`);
  }
}

function* addRecipes(action) {
  try {
    yield axios.post("/api/recipes", action.payload);
    yield put({ type: "FETCH_RECIPES" });
  } catch (error) {
    console.error(`Error adding new recipe`);
  }
}

function* sprecipesSaga() {
  yield takeLatest("FETCH_SPRECIPES", fetchSprecipes);
  yield takeLatest("ADD_RECIPES", addRecipes);
}

export default sprecipesSaga;
