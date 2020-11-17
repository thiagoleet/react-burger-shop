import * as actionTypes from './actionsTypes'
import service from '../../services'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientName: name },
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredientName: name },
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    service
      .getIngredients()
      .then((response) => dispatch(setIngredients(response.data)))
      .catch((err) => dispatch(fetchIngredientsFailed()))
  }
}
