import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Auth/AuthSlice';
import { AUTHSTATE } from './Auth/AuthSlice';
import RecipesReducer from './Recipes/RecipesSlice';
import RecipesPublicReducer from './Recipes/Public/RecipesPublicSlice';
import { RECIPESTATE } from './Recipes/RecipesSlice';

const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Recipes: RecipesReducer,
    RecipesPublic: RecipesPublicReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store, type AUTHSTATE, type RECIPESTATE };