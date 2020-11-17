import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]:
        state.ingredients[action.payload.ingredientName] + 1,
    },
    totalPrice:
      state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
  }
}

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]:
        state.ingredients[action.payload.ingredientName] - 1,
    },
    totalPrice:
      state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
  }
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: initialState.totalPrice,
  })
}

const fetchIngredientsFailes = (state, action) => {
  return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailes(state, action)
    default:
      return state
  }
}

export default reducer
