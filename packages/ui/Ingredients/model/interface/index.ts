import IngredientUnit from "../UNITS"

export default interface Ingredient {
  id: number
  name: string
  unit: IngredientUnit
  price_per_unit: number
  quantity: number
}