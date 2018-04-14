import { combineReducers } from "redux"

import room from "./room"
import meetingOwner from "./meetingOwner"
import nextMeetingOwner from "./nextMeetingOwner"

export default combineReducers({
  room,
  meetingOwner,
  nextMeetingOwner
})
