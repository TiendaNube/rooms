import initialState from "./initialStates/room"
export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "FETCH_ROOM": {
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
      case "BOOK_ACTION": {
        return {...state, booking:true}
      }
      case "BOOK_ACTION_CANCEL": {
        return {...state, booking:false}
      }
      case "BOOK_ACTION_FULFILLED": {
        return {...state, booking:false, room:action.payload}
      }
      case "BOOK_ACTION_REJECTED": {
        return {...state, booking:false, error:action.payload}
      }
      case "CANCEL_MEETING": {
        return {...state, cancelling:true}
      }
      case "CANCEL_MEETING_UNDO": {
        return {...state, cancelling:false}
      }

    }
    return state
}
