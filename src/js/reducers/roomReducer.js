import initialState from "../store/initialStates/room"
export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "FETCH_ROOM": {
        return {...state, fetching: true}
      }
      case "CHANGE_CURRENT_EVENT": {
        return {...state, fetching: true}
      }
      case "FETCH_ROOM_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ROOM_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
      case "CHANGE_CURRENT_EVENT_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
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
      case "CANCEL_MEETING": {
        return {
              ...state,
              data : {
                  ...state.data,
                  currentSlot : {
                      ...state.currentSlot,
                      cancelling:true
                  }
              }
        }
      }
      case "CANCEL_MEETING_UNDO": {
        return {
              ...state,
              data : {
                  ...state.data,
                  currentSlot : {
                      ...state.currentSlot,
                      cancelling:false
                  }
              }
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
