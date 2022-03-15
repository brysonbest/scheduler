export function getAppointmentsForDay(state, day) {
  let apptArray = [];
  if (state.days === null || state.days === undefined) {
    return apptArray;
  }
  const dayObject = state.days.filter((each) => each.name === day)[0];

  if (dayObject) {
    const dayArray = { ...dayObject }["appointments"];
    return dayArray.map((each) => state.appointments[each]);
  }
  return apptArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const intObj = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer]["name"],
      avatar: state.interviewers[interview.interviewer]["avatar"],
    },
  };
  return intObj;
}

export function getInterviewersForDay(state, day) {
  let tempArray = [];
  if (
    state.days === null ||
    state.days === undefined ||
    state.days.length === 0
  ) {
    return tempArray;
  }
  const dayObject = state.days.filter((each) => each.name === day)[0];

  if (!dayObject) {
    return tempArray;
  }
  const dayArray = { ...dayObject }["interviewers"];
  return dayArray.map((each) => state.interviewers[each]);
}
