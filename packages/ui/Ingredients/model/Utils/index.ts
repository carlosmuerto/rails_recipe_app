import IngredientUnit from "../UNITS"
import Ingredient from '../interface'

const create = (
  id: number,
  name: string,
  unit: IngredientUnit,
  price_per_unit: number,
  quantity: number,
):Ingredient => {
  return {
    id: id,
    name: name,
    unit: unit,
    price_per_unit: price_per_unit,
    quantity: quantity,
  }
}

const parsePricePerUnit = (food: Ingredient) =>
  `${food.price_per_unit}\$ per ${food.unit}`

const parseQuantityUnit = (food: Ingredient) => `${food.quantity} ${food.unit}`

export { create, parsePricePerUnit, parseQuantityUnit }
