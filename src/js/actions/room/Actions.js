import axios from "axios";
import actionHelper from "./actionHelper";

function fetchRoom(roomId) {
  return function(dispatch) {
    dispatch({type: "FETCH_ROOM"});
    const params=roomId.replace("sala-", "?number=")
    axios.get(`https://ywp3a1bhla.execute-api.us-west-1.amazonaws.com/dev/sala${params}`)
      .then((response) => {
        const helper = new actionHelper(response.data)
        response.data.state=helper.currentState()
        response.data.currentSlot=helper.currentSlot()
        response.data.nextFreeSlot=helper.nextFreeSlot()
        response.data.nextMeeting=helper.nextMeeting()
        response.data.state.ocupationState=helper.ocupationState(response.data.currentSlot)
        dispatch({type: "FETCH_ROOM_FULFILLED", payload: response.data})
        const user=response.data.currentSlot.organizer
        if(user){
          dispatch({type: "FETCH_USER"});
          axios.get(`http://${window.location.hostname}/api/user/${user.email}`)
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
        const nextMeetingOwner=response.data.nextMeeting.organizer
        if(nextMeetingOwner){
          dispatch({type: "FETCH_NEXT_METTING_OWNER"});
          axios.get(`http://${window.location.hostname}/api/user/${nextMeetingOwner.email}`)
            .then((response) => {
              const payload={
                name:response.data.slackUser.name,
                display_name:response.data.slackUser.profile.display_name,
                images:{
                  original:response.data.slackUser.profile.image_original,
                  size_72:response.data.slackUser.profile.image_72
                }
              }
              dispatch({type: "FETCH_NEXT_METTING_OWNER_FULFILLED", payload})
            })
            .catch((err) => {
              dispatch({type: "FETCH_NEXT_METTING_OWNER_REJECTED", payload: err})
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
    dispatch({type: "BOOK_ACTION"})

    //'/api/rooms/:room/:time'
    axios.post(`http://${window.location.hostname}/api/rooms/sala-8/${time}`)
      .then((response) => {
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
        dispatch({type: "BOOK_ACTION_REJECTED", payload: err})
      })
  }
}

module.exports={
  bookRoom,
  fetchRoom
}
