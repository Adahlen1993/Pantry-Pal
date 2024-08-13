import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import recipes from "./recipes.reducer";
// import ingredients from "./ingredients.reducer";
import userIngredients from "./user.ingredients.reducer";
import allUser from "./all.user.reducer";
import recipePage from "./recipe.page.reducer";
import allRecipesReducer from "./all.recipes.reducer";
import recipeTypeReducer from "./api.spoonacular.reducer";
import ingredientsSpoonReducer from "./ingredients.spoon.reducer";
import recipesSpoonReducer from "./recipes.spoon.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipes,
  // ingredients,
  userIngredients,
  allUser,
  recipePage,
  allRecipesReducer,
  recipeTypeReducer,
  ingredientsSpoonReducer,
  recipesSpoonReducer,

});

export default rootReducer;
