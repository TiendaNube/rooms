import axios from "axios";
import actionHelper from "./actionHelper";

function fetchRoom(roomId) {
  return function(dispatch) {
    dispatch({type: "FETCH_ROOM"});
    const params=roomId.replace("sala-", "?number=")
    //TODO set in server in prod!!
      //  axios.get(`http://${window.location.hostname}/api/rooms/${roomId}`)
    axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/sala${params}&allSchedule=true`)
      .then((response) => {
        const helper = new actionHelper(response.data)
        response.data.state=helper.currentState()
        response.data.currentSlot=helper.currentSlot()
        response.data.nextFreeSlot=helper.nextFreeSlot()
        response.data.nextMeeting=helper.nextMeeting()
        response.data.state.ocupationState=helper.ocupationState(response.data.currentSlot)
        dispatch({type: "FETCH_ROOM_FULFILLED", payload: response.data})
        const user=response.data.currentSlot!=null?response.data.currentSlot.organizer:null
        if(user){
          dispatch({type: "FETCH_USER"});
          axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/slack-user?email=${user.email}`)
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
        const nextMeetingOwner=response.data.nextMeeting!=null?response.data.nextMeeting.organizer:null
        if(nextMeetingOwner){
          dispatch({type: "FETCH_NEXT_METTING_OWNER"});
          axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/slack-user?email=${nextMeetingOwner.email}`)
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

function bookRoom(roomId,time) {
  return function(dispatch) {
    dispatch({type: "BOOK_ACTION"})
    const params=roomId.replace("sala-", "?number=")
    //'/api/rooms/:room/:time'
    //TODO pegarle al end en produ de los user de slack
    axios.post(`http://${window.location.hostname}/api/rooms/${roomId}/${time}`)
      .then((response) => {
        const helper = new actionHelper(response.data)
        response.data.state=helper.currentState()
        response.data.currentSlot=helper.currentSlot()
        response.data.nextFreeSlot=helper.nextFreeSlot()
        response.data.nextMeeting=helper.nextMeeting()
        response.data.state.ocupationState=helper.ocupationState(response.data.currentSlot)
        dispatch({type: "FETCH_ROOM_FULFILLED", payload: response.data})
        const user=response.data.currentSlot!=null?response.data.currentSlot.organizer:null
        if(user){
          dispatch({type: "FETCH_USER"});
          axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/slack-user?email=${user.email}`)
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
        const nextMeetingOwner=response.data.nextMeeting!=null?response.data.nextMeeting.organizer:null
        if(nextMeetingOwner){
          dispatch({type: "FETCH_NEXT_METTING_OWNER"});
          axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/slack-user?email=${nextMeetingOwner.email}`)
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
        dispatch({type: "BOOK_ACTION_REJECTED", payload: err})
      })
  }
}


function cancelMeeting(roomId) {
  return function(dispatch) {
    dispatch({type: "CANCEL_MEETING",payload:roomId});
  }
}

function tickTime(roomId,room) {
  return function(dispatch) {
    const helper = new actionHelper({name:room.name,schedule:room.data.schedule})
    const newCurrenState=helper.currentState()
    const newCurrentSlot=helper.currentSlot()
    if(newCurrentSlot!=room.data.currentSlot&&(room.data.state.status&&room.fetching==false)){
      dispatch({type:"CHANGE_CURRENT_EVENT"});
      const params=roomId.replace("sala-", "?number=")
      axios.get(`https://91qk3xxuce.execute-api.us-west-1.amazonaws.com/dev/sala${params}&allSchedule=true`)
        .then((response) => {
          const helper = new actionHelper(response.data)
          response.data.state=helper.currentState()
          response.data.currentSlot=helper.currentSlot()
          response.data.nextFreeSlot=helper.nextFreeSlot()
          response.data.nextMeeting=helper.nextMeeting()
          response.data.state.ocupationState=helper.ocupationState(response.data.currentSlot)
          dispatch({type: "CHANGE_CURRENT_EVENT_FULFILLED", payload: response.data})
          const user=response.data.currentSlot!=null?response.data.currentSlot.organizer:null
          if(user){
            dispatch({type: "FETCH_USER"});
            //TODO pegarle al end en produ de los user de slack
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
          const nextMeetingOwner=response.data.nextMeeting!=null?response.data.nextMeeting.organizer:null
          if(nextMeetingOwner){
            //TODO pegarle al end en produ de los user de slack
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
    }else{
      let newRoomData={}
      newRoomData.name=room.data.name
      newRoomData.schedule=room.data.schedule
      newRoomData.state=newCurrenState
      newRoomData.currentSlot=newCurrentSlot
      newRoomData.nextFreeSlot=helper.nextFreeSlot()
      newRoomData.nextMeeting=helper.nextMeeting()
      newRoomData.state.ocupationState=helper.ocupationState(newRoomData.currentSlot)
      dispatch({type:"TICK_TIME",payload:newRoomData})
    }
  }
}

module.exports={
  tickTime,
  bookRoom,
  fetchRoom,
  cancelMeeting
}
