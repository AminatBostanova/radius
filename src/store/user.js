//import axios from 'axios'

//----------- action types ------------//
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'

//----------- action creators -----------//
export const gotIsLoggedIn = currentUser => {
  return {
    type: SET_IS_LOGGED_IN,
    currentUser: currentUser
  }
}




//---------- reducer ----------//

export default function userReducer(state = null, action) {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.currentUser
    default:
      return state
  }
}
