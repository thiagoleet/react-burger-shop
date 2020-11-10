import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import Aux from '../../hoc/aux-hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import service from '../../services'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasing: false,
      loading: false,
      error: false,
    }
  }

  async componentDidMount() {
    // try {
    //   const { data } = await service.getIngredients()
    //   this.setState({ ingredients: data })
    // } catch (error) {
    //   this.setState({ error: true })
    // }
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })

    this.props.history.push('/checkout')
  }

  render() {
    let orderSummary = null
    let burger = this.state.error ? (
      <p>Ingredients couldn't be loaded!</p>
    ) : (
      <Spinner />
    )

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    if (this.props.ings) {
      const disabledInfo = {
        ...this.props.ings,
      }

      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseabled={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      )
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName },
      }),
    onIngredientRemoved: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName },
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
