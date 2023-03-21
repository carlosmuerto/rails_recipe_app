enum IngredientUnit {
  g = 'g',
  Kg = 'Kg',
  lts = 'lts',
  ml = 'ml',
  piece = 'piece',
}

type IngredientUnitlStrings = keyof typeof IngredientUnit

interface Ingredient {
  id: number,
  name: string
  unit: IngredientUnit
  price_per_unit: number
  quantity: number
}

const create = (
  id: number,
  name: string,
  unit: IngredientUnit,
  price_per_unit: number,
  quantity: number,
) => {
  return {
    id: id,
    name: name,
    unit: unit,
    price_per_unit: price_per_unit,
    quantity: quantity,
  }
}

const MockUp = [
  create(1, 'Flour', IngredientUnit.g, 0.5, 500),
  create(2, 'Sugar', IngredientUnit.g, 0.3, 200),
  create(3, 'Milk', IngredientUnit.lts, 2.0, 1),
  create(4, 'Eggs', IngredientUnit.piece, 0.1, 6),
  create(5, 'Chocolate', IngredientUnit.g, 1.0, 100),
  create(6, 'Vanilla', IngredientUnit.ml, 5, 1),
  create(7, 'Baking Powder', IngredientUnit.g, 2, 50),
  create(8, 'Butter', IngredientUnit.g, 1, 200),
  create(9, 'Oil', IngredientUnit.ml, 3, 100),
  create(10, 'Water', IngredientUnit.ml, 0.1, 1000),
  create(11, 'Salt', IngredientUnit.g, 0.8, 10),
  create(12, 'Yeast', IngredientUnit.g, 0.5, 10),
  create(13, 'Cocoa Powder', IngredientUnit.g, 2, 50),
  create(14, 'Brown Sugar', IngredientUnit.g, 0.5, 200),
  create(15, 'White Sugar', IngredientUnit.g, 0.5, 200),
  create(16, 'Vanilla Extract', IngredientUnit.ml, 5, 1),
  create(17, 'Baking Soda', IngredientUnit.g, 1, 50),
  create(18, 'Vinegar', IngredientUnit.ml, 1, 100),
  create(19, 'Lemon Juice', IngredientUnit.ml, 2, 1),
  create(20, 'Food Coloring', IngredientUnit.ml, 5, 1)
  ]

const parsePricePerUnit = (food: Ingredient) =>
  `${food.price_per_unit}\$ per ${food.unit}`

  const parseQuantityUnit = (food: Ingredient) =>
    `${food.quantity} ${food.unit}`

export { create, IngredientUnit as UNITS, MockUp, parsePricePerUnit, parseQuantityUnit }

export type { Ingredient as itr }
