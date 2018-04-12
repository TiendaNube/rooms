import axios from "axios";

export function fetchUser(userEmail) {
  return function(dispatch) {
    dispatch({type: "FETCH_USER"});
    axios.get(`http://${window.location.hostname}:3456/api/user/${userEmail}`)
      .then((response) => {
        dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_USER_REJECTED", payload: err})
      })
  }
}
