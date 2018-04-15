import initialState from "../store/initialStates/nextMeetingOwner"

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "LOAD_NEXT_METTING_OWNER": {
        return {...state, loading: true}
      }
      case "LOAD_NEXT_METTING_OWNER_REJECTED": {
        return {...state, loading: false, error: action.payload}
      }
      case "LOAD_NEXT_METTING_OWNER_FULFILLED": {
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        }
      }
    }

    return state
}
