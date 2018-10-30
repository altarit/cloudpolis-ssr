import { fetchGet, fetchPost } from '../../../modules/apiUtils'
import { closeAllPopups } from '../../../modules/popups'

import * as types from './authConstants'

export function resetStatus() {
  return {
    type: types.AUTH_RESET_STATUS
  }
}

export function hi() {
  return dispatch => {
    dispatch({
      type: types.AUTH_HI_REQUEST
    })

    return fetchGet('/hi/')
      .then(({ data }) => {
        dispatch({
          type: types.AUTH_HI_SUCCESS,
          payload: {
            username: data.username
          }
        })
      })
      .catch(ex => {
        dispatch({
          type: types.AUTH_HI_FAILURE
        })
      })
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: types.AUTH_LOGIN_REQUEST,
      name: username,
      pass: password
    })

    let params = {
      body: JSON.stringify({ username: username, password: password })
    }
    return fetchPost('/login/', params)
      .then(({ data }) => {
        console.log('Successful request')

        dispatch({
          type: types.AUTH_LOGIN_SUCCESS,
          payload: {
            username: data.username,
            access: data.access,
            refresh: data.refresh
          }
        })
        dispatch(closeAllPopups())
      })
      .catch(ex => {
        console.warn(`Response ${ex.status}: ${ex.message}`)
        dispatch({
          type: types.AUTH_LOGIN_FAILURE,
          errorText: ex.message
        })
      })
  }
}

export function signup(username, password, email) {
  return dispatch => {
    dispatch({
      type: types.AUTH_SIGNUP_REQUEST,
      name: username,
      pass: password,
      mail: email
    })

    let params = {
      body: JSON.stringify({ username: username, password: password, email: email })
    }
    return fetchPost('/register/', params)
      .then(({ data }) => {
        dispatch({
          type: types.AUTH_SIGNUP_SUCCESS,
          payload: {
            username: data.username,
            access: data.access,
            refresh: data.refresh
          }
        })
        dispatch(closeAllPopups())
      })
      .catch(({error}) => {
        dispatch({
          type: types.AUTH_SIGNUP_FAILURE,
          errorText: error.message
        })
      })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('auth')
    dispatch({
      type: types.AUTH_LOGOUT_REQUEST
    })

    return fetchPost('/logout/')
      .then(json => {
        dispatch({
          type: types.AUTH_LOGOUT_SUCCESS
        })
        dispatch(closeAllPopups())
      })
      .catch(ex => {
        dispatch({
          type: types.AUTH_LOGOUT_FAILURE,
          errorText: ex.message
        })
      })
  }
}

export function setUser(user) {
  return {
    type: types.AUTH_SET_USER,
    name: user.username
  }
}
