import axios from "axios";
import actionHelper from "./actionHelper";

export function fetchRoom(roomId) {
  return function(dispatch) {
    dispatch({type: "FETCH_ROOM"});

    /*
      http://rest.learncode.academy is a public test server, so another user's experimentation can break your tests
      If you get console errors due to bad data:
      - change "reacttest" below to any other username
      - post some tweets to http://rest.learncode.academy/api/yourusername/tweets
    */
    //TODO levantar port de .env
    axios.get(`http://192.168.3.174:3556/api/rooms/${roomId}`)
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
