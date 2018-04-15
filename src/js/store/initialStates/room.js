const propertiesToFronEnd={
      fetching: false,
      fetched: false,
      error: null,
      roomId:null
}
const initialState={
      stateRoom:{
        name:null,
        status:{
          name:null,
          secondsToFinish:null
        },
       ocupationState:null,
       currentSlot: {
         id:null,
         start: null,
         end:null,
         summary:null,
         organizer:{
            email:null
         },
         available: false,
         private: true,
         cancelling:false,
         cancelled:false,
         error:null,
         booking:false,
         booked:false
       },
       nextFreeSlot: {
         start:null,
         end:null
       },
       nextMeeting: {
         id:null,
         start: null,
         end:null,
         summary:null,
         organizer:{
            email:null
         },
         available: true,
         private: true
       }
      }
}
const initialStateToFrontEnd={...initialState,...propertiesToFronEnd}

module.exports={
  initialState,
  initialStateToFrontEnd
}
