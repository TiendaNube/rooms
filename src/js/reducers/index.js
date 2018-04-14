import { combineReducers } from "redux"

import room from "./roomReducer"
import meetingOwner from "./meetingOwnerReducer"
import nextMeetingOwner from "./nextMeetingOwnerReducer"

export default combineReducers({
  room,
  meetingOwner,
  nextMeetingOwner
})
