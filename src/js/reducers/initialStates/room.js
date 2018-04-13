const initialState={
      data:{
        schedule: [],
        name: null,
        state: {
          status:null,
          ocupationState:null,
          time:null
        },
        currentSlot:{
          available:null,
          end:null,
          organizer:null,
          private:null,
          start:null,
          summary:null
        },
        nextFreeSlot:{
          end:null,
          organizer:null,
          private:null,
          start:null,
          summary:null
        },
        nextMeeting:{
          end:null,
          organizer:null,
          private:null,
          start:null,
          summary:null
        }
      },
      fetching: false,
      fetched: false,
      booking:false,
      cancelling:false,
      canceled:false,
      booked:false,
      error: null
}

export default initialState
