import React, { Component } from 'react'
import Aux from '../../hoc/aux-hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import service from '../../services'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseabled: false,
      purchasing: false,
      loading: false,
      error: false,
    }
  }

  async componentDidMount() {
    try {
      const { data } = await service.getIngredients()
      this.setState({ ingredients: data })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCounted = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCounted
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCounted = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCounted
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({ purchaseabled: sum > 0 })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const queryParams = new URLSearchParams()
    for (const key in this.state.ingredients) {
      if (this.state.ingredients.hasOwnProperty(key)) {
        const element = this.state.ingredients[key]
        queryParams.append(key, element)
      }
    }

    queryParams.append('price', this.state.totalPrice)

    this.props.history.push({
      pathname: '/checkout',
      search: queryParams.toString(),
    })
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

    if (this.state.ingredients) {
      const disabledInfo = {
        ...this.state.ingredients,
      }

      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseabled={this.state.purchaseabled}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)
