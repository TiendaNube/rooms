const moment = require("moment")
const {initialState} = require("../../src/js/store/initialStates/room")
const {timesConfig} = require("../../config/app.json")
class reduxRoomStateHelper {
  constructor(name,schedule){
    this.schedule=schedule
    this.name=name
    this.currentSlot=this.currentSlot()
    this.nextMeeting=this.nextMeeting()
    this.ocupationState=this.ocupationState()
    this.nextFreeSlot=this.nextFreeSlot()
  }
  getCurrentState(){
    const status=(this.ocupationState=="busy")?this.getBusyState():this.getFreeState()
    const currentState={
        name:this.name,
        status:status,
        ocupationState:this.ocupationState,
        currentSlot:this.currentSlot,
        nextFreeSlot:this.nextFreeSlot,
        nextMeeting:this.nextMeeting
    }
    return currentState
  }
  getBusyState(){
    const currentMeeting=this.currentSlot
    const nextMeeting=this.nextMeeting
    const now = moment()
    const finishCurrentMeeting = moment(currentMeeting.end)
    const timeToFinishCurrentMeeting=finishCurrentMeeting.diff(now,"seconds")
      if(nextMeeting.available){
        return timeToFinishCurrentMeeting<timesConfig.minutesToFree*60?{name:"toFree",secondsToFinish:timeToFinishCurrentMeeting}:{name:"busy",secondsToFinish:timeToFinishCurrentMeeting}
      }else{
        const startNextMeeting = moment(nextMeeting.start)
        const timeBeteenwMeeting = startNextMeeting.diff(finishCurrentMeeting,"seconds")
        if(timeToFinishCurrentMeeting>timesConfig.minutesToFree*60){
          return {name:"busy",secondsToFinish:timeToFinishCurrentMeeting}
        }else{
          return timeBeteenwMeeting>timesConfig.minutesToFree*60?{name:"toFree",secondsToFinish:timeToFinishCurrentMeeting}:{name:"busy",secondsToFinish:timeToFinishCurrentMeeting}
        }
      }
  }

  getFreeState(){
    const currentSlot=this.currentSlot
    const nextMeeting=this.nextMeeting
    const now = moment()
    const finishCurrentSlot = moment(currentSlot.end)
    const timeToFinishCurrentSlot=finishCurrentSlot.diff(now,"seconds")
      if(nextMeeting.available){
        return {name:"free",secondsToFinish:timeToFinishCurrentSlot}
      }else{
        return timeToFinishCurrentSlot<timesConfig.minutesToBusy*60?{name:"toBusy",secondsToFinish:timeToFinishCurrentSlot}:{name:"free",secondsToFinish:timeToFinishCurrentSlot}
      }
  }
  ocupationState(){
    return this.currentSlot.available?"free":"busy"
  }
  currentSlot(){
    const schedule = this.schedule
    const now = moment()
    const currentSlot=schedule.find(slot => {
      return now.isBetween(slot.start, slot.end)
    }) || null
    if(currentSlot){
      currentSlot.cancelling=false
      currentSlot.cancelled=false,
      currentSlot.error=null,
      currentSlot.booking=false,
      currentSlot.booked=false,
      currentSlot.error=null
      currentSlot.organizer=currentSlot.organizer?currentSlot.organizer:{email:null}//to prevent state errors
    }

    return currentSlot?currentSlot:initialState.stateRoom.currentSlot
  }
  nextMeeting(){
    const schedule = this.schedule
    const currentSlot = this.currentSlot
    const nextMeeting = schedule.find(slot => {
      return (moment(slot.start).isAfter(currentSlot.end)||moment(slot.start).isSame(currentSlot.end))&&(slot.available==false)
    })
      return nextMeeting?nextMeeting:initialState.stateRoom.nextMeeting
  }
  nextFreeSlot(){
    const schedule = this.schedule
    const currentSlot = this.currentSlot
    const nextFreeSlot = schedule.find(slot => {
      return (moment(slot.start).isAfter(currentSlot.end)||moment(slot.start).isSame(currentSlot.end))&&(slot.available==true)
    })
      return nextFreeSlot?{start:nextFreeSlot.start,end:nextFreeSlot.end}:initialState.stateRoom.nextFreeSlot
  }
}

module.exports=reduxRoomStateHelper
