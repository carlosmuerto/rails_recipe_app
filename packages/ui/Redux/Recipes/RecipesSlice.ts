import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loadingStatus from '../reduxConst'
import RecipesAPI, { FetchRecipesResponse } from '../RoRAPI/Recipe'
import { RecipeFoodArgs, RecipeArgs } from '../RoRAPI/Recipe'
import * as Recipe from '../../Recipes'

// actions CONSTANTS
const ACTION_PREPEND = 'API/Recipes'

// RECIPE state interface
interface RECIPESTATE {
  loading: loadingStatus
  list: Recipe.model.INTERFACE[]
  alert: {
    green: string[]
    red: string[]
  }
}

// RECIPE Init State
const initialState:RECIPESTATE = {
  loading: loadingStatus.idle,
  list: [],
  alert: { green: Array<string>(), red: Array<string>() },
};

interface AddRecipeArgs {
  data: RecipeArgs
  token: string
}

const Add = createAsyncThunk(`${ACTION_PREPEND}/ADD`, async ({ data, token }:AddRecipeArgs) =>
  RecipesAPI.Add(data, token),
)

const fetch = createAsyncThunk<FetchRecipesResponse, string>(
  `${ACTION_PREPEND}/FETCH`,
  async (token: string) => RecipesAPI.fetch(token),
)

interface DeleteRecipeArgs {
  RecipeId: number
  token: string
}

const Delete = createAsyncThunk(
  `${ACTION_PREPEND}/DELETE`,
  async ({ RecipeId, token }:DeleteRecipeArgs) => RecipesAPI.Delete(RecipeId, token),
)

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
      })
      // Add a new Recipe
      .addCase(Add.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(Add.fulfilled, (state) => {
        state.loading = loadingStatus.succeeded;
        state.alert.green = ['New Recipe created'];
        state.alert.red = [];
      })
      .addCase(Add.rejected, (state, action) => {
        state.loading = loadingStatus.failed;
        state.alert.green = [];

        // eslint-disable-next-line no-console
        console.log(action);
        state.alert.red = ['Your request cannot be processed'];
      })
      // Delete recipe
      .addCase(Delete.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(Delete.fulfilled, (state, action) => {
        state.loading = loadingStatus.succeeded;
        state.alert.green = ['Recipe Deleted'];
        state.alert.red = [];

        // state.list = state.list.filter(action)
        state.list = action.payload;
      })
      .addCase(Delete.rejected, (state) => {
        state.loading = loadingStatus.failed;
        state.alert.green = [];
        state.alert.red = ['This recipe has scheduled appointments'];
      });
  },
});

const { actions, reducer } = RecipesSlice;

export {
  actions,
  fetch,
  Delete,
  Add,
  type RECIPESTATE
};

export default reducer;
