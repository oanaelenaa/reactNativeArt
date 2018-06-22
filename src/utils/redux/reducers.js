import { combineReducers } from 'redux'
import { ADD_TOAST } from './actions'

function toastMessage (state = null, action) {
  switch (action.type) {
    case ADD_TOAST:
      return action.message
    default:
      return state
  }
}

export default combineReducers({
  appState,
  toastMessage,
  connect: (state = null) => state
})