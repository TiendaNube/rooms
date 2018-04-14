const propertiesToFronEnd={
      fetching: false,
      fetched: false,
      error: null
}
const initialState={
      stateRoom:{
        name:null,
        status:{
          name:null,
          minutesToFinish:null
        },
       ocupationState:null,
       currentSlot: {},
       nextFreeSlot: null,
       nextMeeting: null
      }
}
const initialStateToFrontEnd={...initialState,...propertiesToFronEnd}

module.exports={
  initialState,
  initialStateToFrontEnd
}
