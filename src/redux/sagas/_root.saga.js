import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
// import ingredientsSaga from "./ingredients.saga";
import recipesSaga from "./recipes.saga";
import userIngredientsSaga from "./user.ingredients.saga";
import allUserSaga from "./all.user.saga";
import recipePage from "./recipe.page.saga";
import allRecipesSaga from "./all.recipes.saga";
import recipeTypeSaga from "./recipe.type.saga";
import ingredientsSpoonSaga from "./ingredients.spoon.saga"
import recipesSpoonSaga from "./recipes.spoon.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    // ingredientsSaga(),
    recipesSaga(),
    userIngredientsSaga(),
    allUserSaga(),
    recipePage(),
    allRecipesSaga(),
    recipeTypeSaga(),
    ingredientsSpoonSaga(),
    recipesSpoonSaga(),

  ]);
}
