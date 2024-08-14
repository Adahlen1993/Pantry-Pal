import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchRecipesPage(action) {
    try {
      const response = yield axios.get(`/api/sprecipe/recipe/${action.payload}`);
      yield put({ type: "SET_RECIPE_PAGE", payload: response.data });
    } catch (error) {
      yield put({ type: "RECIPE_PAGE_ERROR", payload: error.message });
    }
  }
function* fetchUserRecipesSpoon(action) {
    try {
        const response = yield axios.post('/api/sprecipe/spoonacular', { ingredients: action.payload.ingredients });
        yield put({ type: "SET_RECIPES_SPOON", payload: response.data });
    } catch (error) {
        console.error(`Error fetching recipes from Spoonacular`, error);
    }
}


function* fetchAllRecipesSpoon(action) {
  try {
    const response = yield axios.get("/api/recipes/all");
    yield put({ type: "SET_RECIPES", payload: response.data });
  } catch (error) {
    console.error(`Error getting all recipes`);
  }
}

function* fetchFilteredRecipesSpoon(action) {
  try {
    const { userId, recipeType } = action.payload;
    const response = yield axios.get("/api/recipes/filtered", {
      params: { userId, recipeType },
    });
    yield put({ type: "SET_RECIPES", payload: response.data });
  } catch (error) {
    console.error(`Error getting filtered recipes`);
  }
}

function* addRecipesSpoon(action) {
  try {
    yield axios.post("/api/recipes", action.payload);
    yield put({ type: "FETCH_RECIPES" });
  } catch (error) {
    console.error(`Error adding new recipe`);
  }
}

function* recipesSpoonSaga() {
  yield takeLatest("FETCH_RECIPE_PAGE", fetchRecipesPage);
  yield takeLatest("ADD_RECIPES", addRecipesSpoon);
  yield takeLatest("FETCH_ALL_RECIPES", fetchAllRecipesSpoon);
  yield takeLatest("FETCH_FILTERED_RECIPES", fetchFilteredRecipesSpoon);
  yield takeLatest("FETCH_RECIPES_SPOON", fetchUserRecipesSpoon);
}

export default recipesSpoonSaga;
