import { configureStore } from '@reduxjs/toolkit';

import recipesReducer from './recipesSlice';
import sidebarReducer from './sidebarSlice';
import authReducer from './authSlice';
import bookmarksReducer from './bookmarksSlice';

export const store = configureStore({
  reducer: {
      recipes: recipesReducer,
      sidebar: sidebarReducer,
      auth: authReducer,
      bookmarks: bookmarksReducer
  },
})