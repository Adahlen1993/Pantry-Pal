const sprecipesReducer = (state = {}, action) => {
    if (action.type === 'SET_SPRECIPE') {
       return action.payload;
    }
    return state
 };
 
 export default sprecipesReducer;