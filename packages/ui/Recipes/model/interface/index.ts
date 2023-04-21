export default interface Recipe {
  id: number
  name: string
  isPublic: boolean
  description: string
  preparationTimeSeconds: number
  cookingTimeSeconds: number
}