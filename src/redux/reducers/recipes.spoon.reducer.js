const recipesSpoonReducer = (state = [], action) => {
    if (action.type === "SET_RECIPES_SPOON") {
      return action.payload;
    }
    return state;
  };
  
  export default recipesSpoonReducer;
  