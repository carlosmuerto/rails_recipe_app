import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loadingStatus from '../../reduxConst'
import RecipesAPI, { FetchRecipesResponse } from '../../RoRAPI/Recipe'
import { RecipeFoodArgs, RecipeArgs } from '../../RoRAPI/Recipe'
import * as Recipe from '../../../Recipes'
import { RECIPESTATE } from '../RecipesSlice'

// actions CONSTANTS
const ACTION_PREPEND = 'API/Recipes/Public'

const fetch = createAsyncThunk<FetchRecipesResponse, string>(
  `${ACTION_PREPEND}/FETCH`,
  async (token: string) => RecipesAPI.fetchPublic(token),
)

// RECIPE Init State
const initialState:RECIPESTATE = {
  loading: loadingStatus.idle,
  list: [],
  alert: { green: Array<string>(), red: Array<string>() },
};

const RecipesSlice = createSlice({
  name: ACTION_PREPEND,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch recipe
      .addCase(fetch.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.loading = loadingStatus.succeeded;
        state.list = action.payload.list
      })
      .addCase(fetch.rejected, (state) => {
        state.loading = loadingStatus.failed;
      });
  },
});

const { actions, reducer } = RecipesSlice;

export {
  actions,
  fetch,
  type RECIPESTATE
};

export default reducer;
