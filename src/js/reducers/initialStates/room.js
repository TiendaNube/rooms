const initialState={
      data:{
        schedule: [],
        name: null,
        state: {
          status:null,
          time:null,
          currentSlot:{
            available:null,
            end:null,
            organizer:null,
            private:null,
            start:null,
            summary:null
          }
        }
      },
      fetching: false,
      fetched: false,
      booking:false,
      booked:false,
      error: null
}

export default initialState
