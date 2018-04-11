import moment from "moment"
export default class actionHelper {
  constructor(data){
    this.schedule=data.schedule
    this.name=data.name
  }

  getCurrentState(){
    let state=null
    if(this.currentEvent()){
      state = "busy"
    }else{
      state = "free"
    }
    if(state=="busy"){
      return this.isToFinish(this.currentEvent())?"toFree":state
    }
    if(state=="free"){
      return this.closeToStart(this.nextEvent())?"toBusy":state
    }
  }

  currentEvent(){
    const schedule = this.schedule
    const now = moment()
    return schedule.find(slot => now.isBetween(slot.start, slot.end)) || null
  }
  nextEvent(){
    const schedule = this.schedule
    return schedule[0]
  }

  isToFinish(currentEvent){
    const now = moment()
    const finishMoment = moment(currentEvent.end)
    const timeGap = finishMoment.diff(now, 'minutes')
    console.log(`timeGap isToFinish ${timeGap}`)
    return timeGap<15?true:false
  }
  closeToStart(nextEvent){
    const now = moment()
    const startMoment = moment(nextEvent.start)
    const timeGap = now.diff(startMoment, 'minutes')
    console.log(`timeGap closeToStart ${timeGap}`)

    return timeGap<15?true:false
  }
}
