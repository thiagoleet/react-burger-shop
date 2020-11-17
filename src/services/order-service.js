import axios from '../axios-orders'

export const createOrder = async (order) => {
  return await axios.post('/orders.json', order)
}

export const getOrders = async () => {
  return await axios.get('/orders.json')
}
