import { z } from 'zod'

const RecipeAddFormSchema = z.object({
  id: z.string().uuid().nullable(),
  name: z.string().nonempty(),
  isPublic: z.boolean().default(false),
  description: z.string().nonempty(),
  preparationTimeSeconds: z.number().nonnegative(),
  cookingTimeSeconds: z.number().nonnegative(),
})


export default interface Recipe extends z.TypeOf<typeof RecipeAddFormSchema> {}

export { RecipeAddFormSchema as schema }