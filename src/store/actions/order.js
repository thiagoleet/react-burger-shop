import * as actionTypes from './actionsTypes'
import service from '../../services'

export const purchaseBurgerSuccess = ({ id, orderData }) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  }
}
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart())
    service
      .createOrder(orderData)
      .then((res) => {
        console.log(res)
        dispatch(purchaseBurgerSuccess({ id: res.data.name, orderData }))
      })
      .catch((err) => dispatch(purchaseBurgerFailed(err)))
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())
    service
      .getOrders()
      .then(({ data }) => {
        const fetchedOrders = []
        for (let key in data) {
          fetchedOrders.push({ ...data[key], id: key })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err))
      })
  }
}
