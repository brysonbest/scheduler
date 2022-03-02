

export function getAppointmentsForDay(state, day) {
  const dayArray = [];
  if(state.days === null || state.days === undefined) {
    return dayArray;
  }
  for(let each of state.days){
    if(each.name === day){
      for(let schedule of each.appointments){
        dayArray.push(state.appointments[schedule]);
      }
    }
  }
  return dayArray;
}