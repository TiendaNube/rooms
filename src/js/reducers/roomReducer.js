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
      case "BOOK_ACTION_REJECTED": {
        return {...state, booking:false, error:action.payload}
      }
      case "BOOK_ACTION_CANCEL": {
        return {...state, booking:false}
      }
    }

    return state
}
