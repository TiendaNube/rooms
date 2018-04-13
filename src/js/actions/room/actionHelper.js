import moment from "moment"
export default class actionHelper {
  constructor(data){
    this.schedule=data.schedule
    this.name=data.name
  }
  currentState(){
    const currentSlot=this.currentSlot()
    const ocupationState=this.ocupationState(currentSlot)
    return ocupationState=="busy"?this.getBusyState():this.getFreeState()
  }
  getBusyState(){
    const currentMeeting=this.currentSlot()
    const nextMeeting=this.nextMeeting()
    const now = moment()
    const finishCurrentMeeting = moment(currentMeeting.end)
    const timeToFinishCurrentMeeting=finishCurrentMeeting.diff(now,"minutes")
      if(nextMeeting==null){
        return timeToFinishCurrentMeeting<15?{status:"toFree",time:timeToFinishCurrentMeeting}:{status:"busy",time:timeToFinishCurrentMeeting}
      }else{
        const startNextMeeting = moment(nextMeeting.start)
        const timeBeteenwMeeting = startNextMeeting.diff(finishCurrentMeeting,"minutes")
        if(timeToFinishCurrentMeeting>15){
          return {status:"busy",time:timeToFinishCurrentMeeting}
        }else{
          return timeBeteenwMeeting>15?{status:"toFree",time:timeToFinishCurrentMeeting}:{status:"busy",time:timeToFinishCurrentMeeting}
        }
      }
  }

  getFreeState(){
    const currentSlot=this.currentSlot()
    const nextMeeting=this.nextMeeting()
    const now = moment()
    const finishCurrentSlot = moment(currentSlot.end)
    const timeToFinishCurrentSlot=finishCurrentSlot.diff(now,"minutes")
      if(nextMeeting==null){
        return {status:"free",time:timeToFinishCurrentSlot}
      }else{
        return timeToFinishCurrentSlot<15?{status:"toBusy",time:timeToFinishCurrentSlot}:{status:"free",time:timeToFinishCurrentSlot}
      }
  }
  ocupationState(currentSlot){
    return currentSlot.available?"free":"busy"
  }
  currentSlot(){
    const schedule = this.schedule
    const now = moment()
    return schedule.find(slot => {
      return now.isBetween(slot.start, slot.end)
    }) || null
  }
  nextMeeting(){
    const schedule = this.schedule
    const currentSlot = this.currentSlot()
    const nextMeeting = schedule.find(slot => {
      return (moment(slot.start).isAfter(currentSlot.end)||moment(slot.start).isSame(currentSlot.end))&&(slot.available==false)
    })
      return nextMeeting?nextMeeting:null
  }
  nextFreeSlot(){
    const schedule = this.schedule
    const currentSlot = this.currentSlot()
    const nextFreeSlot = schedule.find(slot => {
      return (moment(slot.start).isAfter(currentSlot.end)||moment(slot.start).isSame(currentSlot.end))&&(slot.available==true)
    })
      return nextFreeSlot?nextFreeSlot:null
  }


}
