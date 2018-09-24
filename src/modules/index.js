import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import profile from './profile'

import sidebarReducer from '../components/SideBar/modules/sideBar'
import audioDetailsReducer from '../components/AudioDetails/modules/audioDetails'
import playerReducer from '../modules/player/playerReducer'
import popupReducer from '../modules/popups'
import homeReducer from '../routes/Home/modules/home'
// import authReducer from '../components/Auth/modules/authReducer'

export const makeRootReducer = (history, asyncReducers) => {
  return connectRouter(history)(combineReducers({
    auth,
    profile,

    // form: formReducer,
    sidebar: sidebarReducer,
    audioDetails: audioDetailsReducer,
    player: playerReducer,
    popups: popupReducer,
    home: homeReducer,
    // auth: authReducer,
    ...asyncReducers,
  }))
}

export const injectReducer = (store, history, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(history, store.asyncReducers))
}

export default makeRootReducer
