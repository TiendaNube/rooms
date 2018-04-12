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
        console.log(`Fired BOOK_ACTION over state - time:${action.payload}`)
        return {...state, booking:true}
      }
    }

    return state
}
