const userIngredientsReducer = (state = [], action) => {
  if (action.type === "SET_USER_INGREDIENTS") {
    return action.payload;
  }
  return state;
};

export default userIngredientsReducer;
