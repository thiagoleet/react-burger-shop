import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions'
import Aux from '../../hoc/aux-hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasing: false,
    }
  }

  componentDidMount() {
    this.props.onInitIngredients()
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
    this.props.history.push('/checkout')
  }

  render() {
    let orderSummary = null
    let burger = this.props.error ? (
      <p>Ingredients couldn't be loaded!</p>
    ) : (
      <Spinner />
    )

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
    error: state.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
