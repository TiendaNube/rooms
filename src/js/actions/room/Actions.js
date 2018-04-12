import axios from "axios";
import actionHelper from "./actionHelper";

function fetchRoom(roomId) {
  return function(dispatch) {
    dispatch({type: "FETCH_ROOM"});
    axios.get(`http://${window.location.hostname}/api/rooms/${roomId}`)
      .then((response) => {
        const helper = new actionHelper(response.data)
        response.data.state=helper.getCurrentState()
        response.data.state.currentSlot=helper.currentEvent()
        console.log(response.data.currentSlot)
        dispatch({type: "FETCH_ROOM_FULFILLED", payload: response.data})
        const organizer=response.data.state.currentSlot.organizer
        //TODO fix it harcoded value
        if(true){
          dispatch({type: "FETCH_USER"});
          axios.get(`http://${window.location.hostname}/api/user/${"guillermo@tiendanube.com"}`)
            .then((response) => {
              const payload={
                name:response.data.slackUser.name,
                display_name:response.data.slackUser.profile.display_name,
                images:{
                  original:response.data.slackUser.profile.image_original,
                  size_72:response.data.slackUser.profile.image_72
                }
              }
              dispatch({type: "FETCH_USER_FULFILLED", payload})
            })
            .catch((err) => {
              dispatch({type: "FETCH_USER_REJECTED", payload: err})
            })
        }
      })
      .catch((err) => {
        dispatch({type: "FETCH_ROOM_REJECTED", payload: err})
      })
  }
}

function bookRoom(time) {
  return function(dispatch) {
    console.log(`Room booking action dispatched - with time ${time}`)
    dispatch({type: "BOOK_ACTION",payload:time});
  }
}

module.exports={
  bookRoom,
  fetchRoom
}
