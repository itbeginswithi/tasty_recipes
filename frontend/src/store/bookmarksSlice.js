import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    recipes: [],
}
const Bookmarks = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        }
    } 
})

export const {setRecipes} = Bookmarks.actions;
export default Bookmarks.reducer;