import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetchingRecipes: false,
  recipes: [],
  recipesFound: true,
  error: false,
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
    },
    setRecipesFound: (state, action) => {
      state.recipesFound = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
})

export const { setRecipes, setFetchingRecipes, setRecipesFound, setError } = recipesSlice.actions;

export default recipesSlice.reducer;