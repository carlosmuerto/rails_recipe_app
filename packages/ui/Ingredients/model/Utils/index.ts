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

const parsePricePerUnit = (price_per_unit: number, unit: IngredientUnit) =>
  `${price_per_unit}\$ per ${unit}`

const parseQuantityUnit = (quantity: number, unit:IngredientUnit) => `${quantity} ${unit}`

export { create, parsePricePerUnit, parseQuantityUnit }
