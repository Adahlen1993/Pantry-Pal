const allRecipesReducer = (state = [], action) => {
  if (action.type === "SET_ALL_RECIPES") {
    return action.payload;
  }
  return state;
};

export default allRecipesReducer;
