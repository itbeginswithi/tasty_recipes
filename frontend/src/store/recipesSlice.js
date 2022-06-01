import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetchingRecipes: false,
  recipes: []
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setFetchingRecipes: (state, action) => {
      state.fetchingRecipes = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload.recipes
    }
  },
})

export const { setRecipes, setFetchingRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;