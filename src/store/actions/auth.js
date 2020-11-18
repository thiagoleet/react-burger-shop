import axios from 'axios'
import * as actionTypes from './actionsTypes'
import { API_KEY } from '../../credentials'

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const url = isSignUp ? signUpUrl : signInUrl
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res)
        dispatch(authSuccess(res))
      })
      .catch((err) => {
        console.log(err)
        dispatch(authFailed(err))
      })
  }
}
