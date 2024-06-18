const recipePageReducer = (state = [], action) => {
    if (action.type === 'SET_RECIPES_PAGE') {
       return action.payload;
    }
    return state
 };
 
 export default recipePageReducer;