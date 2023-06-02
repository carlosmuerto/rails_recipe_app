import { z } from 'zod'
import Ingredient from '../../../Ingredients/model/interface'

const IngredientsFormScheme = z.object({
  food_id: z.string().nullable(),
  quantity: z.number().nonnegative(),
})

const RecipeAddFormSchema = z.object({
  id: z.string().uuid().nullable(),
  name: z.string().nonempty(),
  isPublic: z.boolean().default(false),
  description: z.string().nonempty(),
  preparationTimeSeconds: z.number().nonnegative(),
  cookingTimeSeconds: z.number().nonnegative(),
  foods: z.array(IngredientsFormScheme)
})

type Recipe = Omit<Omit<z.infer<typeof RecipeAddFormSchema>, 'foods'>, 'id'>  & {
  id: string;
  foods: Ingredient[];
};

export default Recipe

export { RecipeAddFormSchema as schema }