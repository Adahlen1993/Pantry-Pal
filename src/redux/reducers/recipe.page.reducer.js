const recipePageReducer = (state = {}, action) => {
    if (action.type === 'SET_RECIPE_PAGE') {
       return action.payload;
    }
    return state
 };
 
 export default recipePageReducer;