import { combineReducers } from "redux"

import room from "./roomReducer"
import user from "./userReducer"
import nextMeetingOwner from "./nextMeetingOwnerReducer"

export default combineReducers({
  room,
  user,
  nextMeetingOwner
})
