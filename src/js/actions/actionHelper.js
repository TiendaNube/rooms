import moment from "moment"
export default class actionHelper {
  constructor(data){
    this.schedule=data.schedule
    this.name=data.name
  }

  getCurrentState(){
    let state=null
    let currentEvent=this.currentEvent()
    if(currentEvent.available){
      state = "free"
    }else{
      state = "busy"
    }
    if(state=="busy"){
      return this.isToFinish(this.currentEvent())?{status:"toFree",time:this.timeToFinish(this.currentEvent())}:{status:state,time:30}
    }
    if(state=="free"){
      return this.closeToStart(this.nextEvent())?{status:"toBusy",time:this.timeToStart(this.nextEvent())}:{status:state,time:30}
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
  timeToFinish(currentEvent){
    const now = moment()
    const finishMoment = moment(currentEvent.end)
    return finishMoment.diff(now, 'minutes')
  }
  isToFinish(currentEvent){
    return this.timeToFinish(currentEvent)<15?true:false
  }

  timeToStart(nextEvent){
    const now = moment()
    const startMoment = moment(nextEvent.start)
    return now.diff(startMoment, 'minutes')
  }
  closeToStart(nextEvent){
    return this.timeToStart(nextEvent)<15?true:false
  }

}
