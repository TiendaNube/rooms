import { combineReducers } from "redux"

import room from "./roomReducer"
import user from "./userReducer"

export default combineReducers({
  room,
  user
})
