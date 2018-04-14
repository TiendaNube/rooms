const propertiesToFronEnd={
      fetching: false,
      fetched: false,
      error: null
}
const initialState={
      stateRoom:null
}
const initialStateToFrontEnd={...initialState,...propertiesToFronEnd}

module.exports={
  initialState,
  initialStateToFrontEnd
}
