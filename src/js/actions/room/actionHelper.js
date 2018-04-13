import moment from "moment"
moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        mm: "%d"
    }
});


export default class actionHelper {
  constructor(data){
    this.schedule=data.schedule
    this.name=data.name
  }

  getCurrentState(){
    const currentEvent=this.currentEvent()
    const ocupationState=this.ocupationState(currentEvent)
    return ocupationState=="busy"?this.getBusyState():this.getFreeState()
  }
  getBusyState(){
    const currentEvent=this.currentEvent()
    const nextEvent=this.nextEvent()
    const now = moment()
    const finishCurrentEvent = moment(currentEvent.end)
    const gapToFinishCurrentEvent=finishCurrentEvent.diff(now,"minutes")
      if(nextEvent==null){
        return finishCurrentEvent<15?{status:"toFree",time:gapToFinishCurrentEvent}:{status:"busy",time:gapToFinishCurrentEvent}
      }else{
        const startNextEvent = moment(nextEvent.start)
        const finishNextEvent = moment(nextEvent.end)
        const gapBeteenwEvent=startNextEvent.diff(finishCurrentEvent,"minutes")
        const gapToFinishNextEvent=finishNextEvent.diff(now,"minutes")
        if(gapToFinishCurrentEvent>15){
          return {status:"busy",time:gapToFinishCurrentEvent}
        }else{
          return gapBeteenwEvent>15?{status:"toFree",time:gapToFinishCurrentEvent}:{status:"busy",time:gapToFinishNextEvent}
        }
      }
  }

  getFreeState(){
    const currentEvent=this.currentEvent()
    const nextEvent=this.nextEvent()
    const now = moment()
    const finishCurrentEvent = moment(currentEvent.end)
    const gapToFinishCurrentEvent=finishCurrentEvent.diff(now,"minutes")
      if(nextEvent==null){
        return {status:"free",time:gapToFinishCurrentEvent}
      }else{
        return gapToFinishCurrentEvent<15?{status:"toBusy",time:gapToFinishCurrentEvent}:{status:"free",time:gapToFinishCurrentEvent}
      }
  }



  ocupationState(currentEvent){
    return currentEvent.available?"free":"busy"
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
    const nextSlot = schedule.find(slot => {
      return moment(slot.start).isSame(currentEvent.end)&&(slot.available==false)
    })
      return nextSlot?nextSlot:null
  }
  nextFreeSlot(){
    const schedule = this.schedule
    const currentEvent = this.currentEvent()
    const nextSlot = schedule.find(slot => {
      return moment(slot.start).isAfter(currentEvent.end)&&(slot.available==true)
    })
      return nextSlot?nextSlot:null
  }


}
