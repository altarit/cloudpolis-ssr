import { combineReducers } from 'redux'

import auth from './auth'
import profile from './profile'

import sidebarReducer from '../components/SideBar/modules/sideBar'
import audioDetailsReducer from '../components/AudioDetails/modules/audioDetails'
import playerReducer from '../modules/player/playerReducer'
import popupReducer from '../modules/popups'
// import homeReducer from '../routes/Home/modules/home'
// import authReducer from '../components/Auth/modules/authReducer'

export default combineReducers({
  auth,
  profile,

  // form: formReducer,
  sidebar: sidebarReducer,
  audioDetails: audioDetailsReducer,
  player: playerReducer,
  popups: popupReducer,
  // home: homeReducer,
  // auth: authReducer,
})
