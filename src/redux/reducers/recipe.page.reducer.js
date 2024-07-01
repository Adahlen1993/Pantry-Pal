const recipePageReducer = (state = {}, action) => {
   switch (action.type) {
     case 'SET_RECIPE_PAGE':
       return { ...state, data: action.payload, error: null };
     case 'SET_RECIPE_PAGE_ERROR':
       return { ...state, error: action.payload };
     default:
       return state;
   }
 };
 
 export default recipePageReducer;