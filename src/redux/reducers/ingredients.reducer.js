const ingredientsReducer = (state = [], action) => {
    if (action.type === 'SET_INGREDIENTS') {
       return action.payload;
    }
    return state
 };
 
 export default ingredientsReducer;