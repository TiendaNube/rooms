export default function reducer(state={
    data:{
      schedule: [],
      name: null,
      state: {
        status:null,
        time:null
      }
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

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
    }

    return state
}
