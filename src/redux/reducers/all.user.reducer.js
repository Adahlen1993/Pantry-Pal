const allUserReducer = (state = [], action) => {
    if (action.type === 'SET_ALL_USER') {
       return action.payload;
    }
    return state
 };
 
 export default allUserReducer;