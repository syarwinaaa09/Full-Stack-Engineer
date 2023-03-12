// Without createAsyncThunk, we have to dispatch pending/fulfilled/rejected actions ourself.
export const loadRecipes = () => {
    return async (dispatch, getState) => {
      dispatch({type: "allRecipes/getAllRecipes/pending"})
      try {
        const data = await fetch("api/recipes?limit=10");
        const json = await data.json(); 
        dispatch({type: "allRecipes/getAllRecipes/fulfilled", payload: json})
      } catch (err) {
        dispatch({type: "allRecipes/getAllRecipes/rejected", payload: err})
      }   
    }
  }