import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'
class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      loading: true,
    }
  }
  componentDidMount() {
    axios
      .get('/orders.json')
      .then(({ data }) => {
        const fetchedOrders = []
        for (let key in data) {
          fetchedOrders.push({ ...data[key], id: key })
        }
        this.setState({ orders: fetchedOrders })
      })
      .catch((err) => {})
      .finally(() => {
        this.setState((prevState) => {
          loading: false
        })
      })
  }

  render() {
    const orders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      )
    })

    return <div>{orders}</div>
  }
}

export default withErrorHandler(Orders, axios)
