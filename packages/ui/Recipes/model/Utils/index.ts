import Recipe from '../interface'

const create = (
  id: string,
  name: string,
  description: string,
  isPublic: boolean = false,
  preparationTimeSeconds: number = 60,
  cookingTimeSeconds: number = 60
):Recipe => {
  return {
    id,
    name,
    isPublic,
    description,
    preparationTimeSeconds,
    cookingTimeSeconds,
  }
}
export { create }
