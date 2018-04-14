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
    const timeToFinishCurrentMeeting=finishCurrentMeeting.diff(now,"minutes")
      if(nextMeeting.available){
        return timeToFinishCurrentMeeting<timesConfig.minutesToFree?{name:"toFree",minutesToFinish:timeToFinishCurrentMeeting}:{name:"busy",minutesToFinish:timeToFinishCurrentMeeting}
      }else{
        const startNextMeeting = moment(nextMeeting.start)
        const timeBeteenwMeeting = startNextMeeting.diff(finishCurrentMeeting,"minutes")
        if(timeToFinishCurrentMeeting>timesConfig.minutesToFree){
          return {name:"busy",minutesToFinish:timeToFinishCurrentMeeting}
        }else{
          return timeBeteenwMeeting>timesConfig.minutesToFree?{name:"toFree",minutesToFinish:timeToFinishCurrentMeeting}:{name:"busy",minutesToFinish:timeToFinishCurrentMeeting}
        }
      }
  }

  getFreeState(){
    const currentSlot=this.currentSlot
    const nextMeeting=this.nextMeeting
    const now = moment()
    const finishCurrentSlot = moment(currentSlot.end)
    const timeToFinishCurrentSlot=finishCurrentSlot.diff(now,"minutes")
      if(nextMeeting.available){
        return {name:"free",minutesToFinish:timeToFinishCurrentSlot}
      }else{
        return timeToFinishCurrentSlot<timesConfig.minutesToBusy?{name:"toBusy",minutesToFinish:timeToFinishCurrentSlot}:{name:"free",minutesToFinish:timeToFinishCurrentSlot}
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
