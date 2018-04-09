import axios from "axios";

export function getUser(email,type){
  return function(dispatch) {
      dispatch({type: `LOAD_${type}`});
      axios.get(`http://${window.location.hostname}/api/user/${email}`)
        .then((response) => {
          dispatch({type: `LOAD_${type}_FULFILLED`, payload:response.data.slackUser})
      })
      .catch((err) => {
          dispatch({type: `LOAD_${type}_REJECTED`, payload: err})
      })
  }
}
