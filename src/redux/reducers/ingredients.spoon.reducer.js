const ingredientsSpoonReducer = (state = [], action) => {
    if (action.type === "SET_INGREDIENTS_SPOON") {
      return action.payload;
    }

    return state;
  };
  
  export default ingredientsSpoonReducer;
  