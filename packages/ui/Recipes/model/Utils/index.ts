import Recipe from '../interface'

const create = (
  id: number,
  name: string,
):Recipe => {
  return {
    id: id,
    name: name,
  }
}
export { create }
