import { configureStore } from '@reduxjs/toolkit';

import recipesReducer from './recipesSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
  reducer: {
      recipes: recipesReducer,
      sidebar: sidebarReducer
  },
})