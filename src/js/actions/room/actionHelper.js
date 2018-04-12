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
    let currentEvent=this.currentEvent()
    let nextEvent=this.nextEvent()
    let ocupationState=this.ocupationState(currentEvent)
    if(nextEvent==null){
      let gapToEndCurrentEvent = moment(currentEvent.end).fromNow()
      if(ocupationState=="busy"){
        return gapToEndCurrentEvent<15?{status:"toFree",time:gapToEndCurrentEvent}:{status:ocupationState,time:gapToEndCurrentEvent}
      }else{
        return {status:ocupationState,time:gapToEndCurrentEvent}
      }
    }else{
      const a = moment(currentEvent.end);
      const b = moment(nextEvent.start);
      let gapToNextEvent = a.diff(b)
      let gapToEndCurrentEvent = moment(currentEvent.end).fromNow()
      if(ocupationState=="busy"){
        return gapToNextEvent>15?{status:"toFree",time:gapToNextEvent}:{status:ocupationState,time:gapToEndCurrentEvent}
      }else{
        return gapToNextEvent<15?{status:"toBusy",time:gapToNextEvent}:{status:ocupationState,time:gapToEndCurrentEvent}
      }
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
      return moment(slot.start).isAfter(currentEvent.end)&&(slot.available==false)
    })
      return nextSlot?nextSlot:null
  }

}
