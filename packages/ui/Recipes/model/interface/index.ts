import { z } from 'zod'

const RecipeAddFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  isPublic: z.boolean().default(false),
  description: z.string().nonempty(),
  preparationTimeSeconds: z.number().positive(),
  cookingTimeSeconds: z.number().positive(),
})


export default interface Recipe extends z.TypeOf<typeof RecipeAddFormSchema> {}

export { RecipeAddFormSchema as schema }