const moment = require("moment")
const {initialState} = require("../../src/js/store/initialStates/room")
const {timesConfig} = require("../../config/app.json")

class reduxRoomStateHelper {
  constructor(name,schedule,forceCurrentEventFree=false){
    this.schedule=schedule
    this.name=name
    this.currentSlot=forceCurrentEventFree?this.forceCurrenSlotFree():this.currentSlot()
    this.nextMeeting=this.nextMeeting()
    this.ocupationState=this.ocupationState()
    this.nextFreeSlot=this.nextFreeSlot()
  }
  forceCurrenSlotFree(){
    const currentSlot=this.currentSlot()
    currentSlot.available=true
    currentSlot.summary="Free"
    currentSlot.organizer={email:null}
    currentSlot.private=false
    if(currentSlot.status){
      delete currentSlot["status"]
    }
    if(currentSlot.id){
      delete currentSlot["id"]
    }
    return currentSlot
  }
  getCurrentState(){
    const status=(this.ocupationState=="busy")?this.getBusyState():this.getFreeState()
    const currentState={
        name:this.name,
        status:status,
        ocupationState:this.ocupationState,
        currentSlot:this.currentSlot,
        nextFreeSlot:this.nextFreeSlot,
        nextMeeting:this.nextMeeting,
        schedule:this.schedule
    }
    return currentState
  }
  getBusyState(){
    const currentMeeting=this.currentSlot
    const nextMeeting=this.nextMeeting
    const now = moment()
    const finishCurrentMeeting = moment(currentMeeting.end)
    const secondsToFinishCurrentMeeting=finishCurrentMeeting.diff(now,"seconds")
    const minutesToFinishCurrentMeeting=finishCurrentMeeting.diff(now,"minutes")
    const timesConfigMinutes=timesConfig.minutesToFree
    const timesConfigSeconds=timesConfig.minutesToFree*60
      if(nextMeeting.available){
        return minutesToFinishCurrentMeeting<timesConfigMinutes?{name:"toFree",secondsToFinish:secondsToFinishCurrentMeeting-timesConfigSeconds}:{name:"busy",secondsToFinish:secondsToFinishCurrentMeeting}
      }else{
        const startNextMeeting = moment(nextMeeting.start)
        const secondsBeteenwMeeting = startNextMeeting.diff(finishCurrentMeeting,"seconds")
        if(minutesToFinishCurrentMeeting>timesConfigMinutes){
          return {name:"busy",secondsToFinish:secondsToFinishCurrentMeeting-timesConfigSeconds}
        }else{
          return secondsBeteenwMeeting>timesConfigSeconds?{name:"toFree",secondsToFinish:secondsToFinishCurrentMeeting-timesConfigSeconds}:{name:"busy",secondsToFinish:secondsToFinishCurrentMeeting-timesConfigSeconds}
        }
      }
  }

  getFreeState(){
    const currentSlot=this.currentSlot
    const nextMeeting=this.nextMeeting
    const now = moment()
    const finishCurrentSlot = moment(currentSlot.end)
    const secondsToFinishCurrentSlot=finishCurrentSlot.diff(now,"seconds")
    const timesConfigSeconds=timesConfig.minutesToBusy*60
      if(nextMeeting.available){
        return {name:"free",secondsToFinish:secondsToFinishCurrentSlot}
      }else{
        return timeToFinishCurrentSlot<timesConfigSeconds?{name:"toBusy",secondsToFinish:secondsToFinishCurrentSlot-timesConfigSeconds}:{name:"free",secondsToFinish:secondsToFinishCurrentSlot}
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
