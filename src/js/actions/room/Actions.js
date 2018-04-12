import axios from "axios";
import actionHelper from "./actionHelper";

export function fetchRoom(roomId) {
  return function(dispatch) {
    dispatch({type: "FETCH_ROOM"});
    console.log(`http://${window.location.hostname}/api/rooms/${roomId}`)
    axios.get(`http://${window.location.hostname}:3456/api/rooms/${roomId}`)
      .then((response) => {
        const helper = new actionHelper(response.data)
        response.data.state=helper.getCurrentState()
        response.data.currentSlot=helper.currentEvent()
        dispatch({type: "FETCH_ROOM_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ROOM_REJECTED", payload: err})
      })
  }
}
