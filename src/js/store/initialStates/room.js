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
          booking:false,
          booked:false,
          cancelling:false,
          cancelled:false,
          available:null,
          end:null,
          organizer:null,
          private:null,
          start:null,
          summary:null,
          error:null
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
      error: null
}

export default initialState
