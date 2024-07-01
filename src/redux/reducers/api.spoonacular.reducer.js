const recipeTypeReducer = (state = [], action) => {
  if (action.type === "SET_RECIPE_TYPE") {
    return action.payload;
  }
  return state;
};

export default recipeTypeReducer;
