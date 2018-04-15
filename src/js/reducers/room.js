import {initialStateToFrontEnd} from "../store/initialStates/room"
export default function reducer(state=initialStateToFrontEnd, action) {
    switch (action.type) {
      case "LOAD_ROOM_STATE": {
        return {...state, loading: true,loaded: false, roomId:action.payload}
      }
      case "LOAD_ROOM_STATE_REJECTED": {
        return {...state, loading: false, error: action.payload}
      }
      case "LOAD_ROOM_STATE_FULFILLED": {
        return {
          ...state,
          loading: false,
          loaded: true,
          stateRoom: action.payload,
        }
      }
      case "CHANGE_CURRENT_EVENT": {
        return {...state, loading: true}
      }
      case "CHANGE_CURRENT_EVENT_FULFILLED": {
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        }
      }
      case "BOOK_ACTION": {
        return {...state, booking:true}
      }
      case "BOOK_ACTION_CANCEL": {
        return {...state, booking:false}
      }
      case "BOOK_ACTION_FULFILLED":  {
        return {
          ...state,
          booking: false,
          booked: true,
          data: action.payload,
        }
      }
      case "BOOK_ACTION_REJECTED": {
        return {...state, booking:false, error:action.payload}
      }
      case "CANCEL_CURRENT_MEETING": {
        return {
              ...state,
              stateRoom : {
                  ...state.stateRoom,
                  currentSlot : {
                      ...state.stateRoom.currentSlot,
                      cancelling:true
                  }
              }
        }
      }
      case "CANCEL_CURRENT_MEETING_FAIL": {
        return {...state, error: action.payload}
      }
      case "CANCEL_CURRENT_MEETING_SUCCESS": {
        return {
          ...state,
          stateRoom: action.payload,
        }
      }

      case "FAST_BOOKING": {
        return {
        ...state,
          room : {
              ...state.room,
              currentSlot : {
                  ...state.currentSlot,
                  cancelling:true
              }
          }
        }
      }
      case "FAST_BOOKING_UNDO": {
        return {
        ...state,
          room : {
              ...state.room,
              currentSlot : {
                  ...state.currentSlot,
                  cancelling:false
              }
          }
        }
      }

      case "TICK_TIME": {
        return {
          ...state,
          data: action.payload,
        }
      }


    }
    return state
}
