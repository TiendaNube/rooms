import initialState from "../store/initialStates/meetingOwner"

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "LOAD_USER": {
        return {...state, loading: true}
      }
      case "LOAD_USER_REJECTED": {
        return {...state, loading: false, error: action.payload}
      }
      case "LOAD_USER_FULFILLED": {
        return {
          ...state,
          loading: false,
          loaded: true,
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
