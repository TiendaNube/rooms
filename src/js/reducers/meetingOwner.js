import initialState from "../store/initialStates/meetingOwner"

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
      case "DELETE_CURRENT_OWNER": {
        return {
          ...initialState
        }
      }
    }

    return state
}
