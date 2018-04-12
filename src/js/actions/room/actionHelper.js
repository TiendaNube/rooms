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
      return this.isToFree(this.currentEvent(),this.nextEvent())?{status:"toFree",time:this.timeToFinish(this.currentEvent())}:{status:state,time:30}
    }
    if(state=="free"){
      return this.closeToStart(this.nextEvent())?{status:"toBusy",time:this.timeToStart(this.nextEvent())}:{status:state,time:30}
    }
  }

  currentEvent(){
    const schedule = this.schedule
    const now = moment()
    return schedule.find(slot => {
      return now.isBetween(slot.start, slot.end)
    }) || null
  }
  nextEvent(){
    const schedule = this.schedule
    const currentEvent = this.currentEvent()
    const currentEventFinish = moment(currentEvent.end)
    currentEventFinish.add(1,"minutes")
    const nextSlot = schedule.find(slot => {
      return currentEventFinish.isBetween(slot.start, slot.end)
    })
    if(nextSlot.summary!=currentEvent.summary){
      return nextSlot
    }else{
      null
    }
  }
  timeToFinish(currentEvent){
    const now = moment()
    const finishMoment = moment(currentEvent.end)
    return finishMoment.diff(now, 'minutes')
  }
  isToFree(currentEvent,nextEvent){
    return (nextEvent.available&&this.timeToFinish(currentEvent)<15)?true:false
  }

  timeToStart(nextEvent){
    console.log(nextEvent)
    const now = moment()
    const startMoment = moment(nextEvent.start)
    return startMoment.diff(now, 'minutes')
  }
  closeToStart(nextEvent){
    return this.timeToStart(nextEvent)<15?true:false
  }

}