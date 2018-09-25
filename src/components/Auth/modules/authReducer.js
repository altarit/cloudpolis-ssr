import * as types from './authConstants'

const initialState = {}

const ACTION_HANDLERS = {
  [types.AUTH_RESET_STATUS]: (state, action) => {
    return { name: state.name }
  },
  [types.AUTH_HI_REQUEST]: (state, action) => {
    return { ...state }
  },
  [types.AUTH_HI_SUCCESS]: (state, { payload }) => {
    const { username } = payload
    return { ...state, name: username }
  },
  [types.AUTH_HI_FAILURE]: (state, { payload }) => {
    return { ...state, name: null }
  },
  [types.AUTH_LOGIN_REQUEST]: (state, action) => {
    return { ...state, fetching: true }
  },
  [types.AUTH_LOGIN_SUCCESS]: (state, { payload }) => {
    const { username, access, refresh } = payload
    localStorage.setItem('auth', access)
    localStorage.setItem('refresh', refresh)
    return { ...state, fetching: false, name: username }
  },
  [types.AUTH_LOGIN_FAILURE]: (state, action) => {
    return { ...state, fetching: false, errorText: action.errorText }
  },
  [types.AUTH_SIGNUP_REQUEST]: (state, action) => {
    return { ...state, fetching: true }
  },
  [types.AUTH_SIGNUP_SUCCESS]: (state, action) => {
    return { ...state, fetching: false, name: action.name }
  },
  [types.AUTH_SIGNUP_FAILURE]: (state, action) => {
    return { ...state, fetching: false, errorText: action.errorText }
  },
  [types.AUTH_LOGOUT_REQUEST]: (state, action) => {
    return { ...state, fetching: true }
  },
  [types.AUTH_LOGOUT_SUCCESS]: (state, action) => {
    return { ...state, fetching: false, name: undefined }
  },
  [types.AUTH_LOGOUT_FAILURE]: (state, action) => {
    return { ...state, fetching: false, errorText: action.errorText }
  },
  [types.AUTH_SET_USER]: (state, action) => {
    return { ...state, name: action.name }
  }
}

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
