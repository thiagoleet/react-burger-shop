import axios from '../axios-orders'

export const createOrder = async (order) => {
  return await axios.post('/orders.json', order)
}
