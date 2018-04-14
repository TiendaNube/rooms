import axios from "axios";

export function getUser(email,type) {
  return function(dispatch) {
      dispatch({type: `FETCH_${type}`});
      axios.get(`http://${window.location.hostname}/api/user/${email}`)
        .then((response) => {
          const payload={
            name:response.data.slackUser.name,
            display_name:response.data.slackUser.profile.display_name,
            images:{
              original:response.data.slackUser.profile.image_original,
              size_72:response.data.slackUser.profile.image_72
            }
          }
          dispatch({type: `FETCH_${type}_FULFILLED`, payload})
        })
        .catch((err) => {
          dispatch({type: `FETCH_${type}_REJECTED`, payload: err})
        })
  }
}
