import initialState from "../store/initialStates/nextMeetingOwner"

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "FETCH_NEXT_METTING_OWNER": {
        return {...state, fetching: true}
      }
      case "FETCH_NEXT_METTING_OWNER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_NEXT_METTING_OWNER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
    }

    return state
}
