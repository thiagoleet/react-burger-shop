import axios from '../axios-orders'

export const getIngredients = async () => {
  return await axios.get('/ingredients.json')
}
