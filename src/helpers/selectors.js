

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


export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const intObj = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer]['name'],
      avatar: state.interviewers[interview.interviewer]['avatar']
    }
  }
  return intObj;
}