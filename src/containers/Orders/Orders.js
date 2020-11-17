import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        )
      })
    }

    return <div>{orders}</div>
  }
}

const mapStateToProps = ({ order: state }) => {
  return {
    orders: state.orders,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
