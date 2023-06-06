/* eslint-disable no-promise-executor-return */
import axios from 'axios'
import BASEURL from './URL_API'
import * as Recipe from '../../Recipes'
import  * as Ingredient from '../../Ingredients/'

const DIRECTION = 'recipes'

const options = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

// FetchRecipesResponse

interface FetchRecipesResponse {
    list: Recipe.model.INTERFACE[];
  }

// FETCH all recipes
const fetch = async (token: string):Promise<FetchRecipesResponse> => {
  const authorization = `Bearer ${token}`

  const CurrentUserOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  }

  const answer = await axios.get(BASEURL + DIRECTION, CurrentUserOptions)
  
  const fetchRecipesResponse:FetchRecipesResponse = {
    list: answer.data.map((entry:any):Recipe.model.INTERFACE => {
      return {
        id: entry.id,
        name: entry.name,
        description: entry.description,
        isPublic: entry.public,
        preparationTimeSeconds: entry.preparation_time,
        cookingTimeSeconds: entry.cooking_time,
        foods: entry.foods.map((ingre:any):Ingredient.model.TYPE => ({
          id: ingre.food.id,
          name: ingre.food.name,
          price_per_unit: ingre.food.price_per_unit,
          unit: ingre.food.unit,
          quantity: ingre.quantity
        }))
      }
    })
  }

  return fetchRecipesResponse
}

// FETCH all recipes
const fetchPublic = async (token: string):Promise<FetchRecipesResponse> => {
  const authorization = `Bearer ${token}`

  const CurrentUserOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  }

  const answer = await axios.get(`${BASEURL + DIRECTION}/publics`, CurrentUserOptions)
  
  const fetchRecipesResponse:FetchRecipesResponse = {
    list: answer.data.map((entry:any):Recipe.model.INTERFACE => {
      return {
        id: entry.id,
        name: entry.name,
        description: entry.description,
        isPublic: entry.public,
        preparationTimeSeconds: entry.preparation_time,
        cookingTimeSeconds: entry.cooking_time,
        foods: entry.foods.map((ingre:any):Ingredient.model.TYPE => ({
          id: ingre.food.id,
          name: ingre.food.name,
          price_per_unit: ingre.food.price_per_unit,
          unit: ingre.food.unit,
          quantity: ingre.quantity
        }))
      }
    })
  }

  return fetchRecipesResponse
}

// Delete Recipe
const Delete = async (RecipeId: number, token: string) => {
  const authorization = `Bearer ${token}`

  const AuthorizedOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  }

  const res = await axios.delete(
    `${BASEURL + DIRECTION}/${RecipeId}`,
    AuthorizedOptions,
  )

  const answer = res.data
  return answer
}

interface RecipeFoodArgs {
  food_id: number;
  quantity: number;
}

interface RecipeArgs {
  name: string;
  preparation_time: number;
  cooking_time: number;
  description: string;
  public: boolean;
  foods: RecipeFoodArgs[];
}

// Add Recipe
const Add = async (data:RecipeArgs , token: string) => {
  const authorization = `Bearer ${token}`

  const optionsAdd = {
    headers: {
      accept: 'application/json',
    },
  }
  const AddRecipeOptions = {
    headers: {
      ...optionsAdd.headers,
      authorization,
    },
  }

  const answer = await axios.post(BASEURL + DIRECTION, data, AddRecipeOptions)

  return answer.data
}

const RecipesAPI = {
  fetch,
  fetchPublic,
  Delete,
  Add,
}

export default RecipesAPI
export type { FetchRecipesResponse, RecipeFoodArgs, RecipeArgs }