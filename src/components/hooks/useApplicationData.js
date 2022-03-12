import {useState, useEffect} from "react";

import axios from "axios";

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daySpots = function(){
      for(let i = 0; i < state.day.length; i++){
        if(state.days[i]['name'] === state.day){
          const newDays = [ ...state.days ];
          if(state.appointments[id]['interview'] === null){
            newDays[i]['spots'] = state.days[i]['spots'] - 1; 
             return newDays;
          }
          newDays[i]['spots'] = state.days[i]['spots']; 
          return newDays;
        } 
      }
    }

    const spots = daySpots();

    const sendPutRequest = async () => {
      const resp = await axios.put(`http://localhost:8001/api/appointments/${id}`, appointment);
      setState({
        ...state, appointments, days:spots
      })       
      console.log(resp.data);
    }
  return sendPutRequest();  
};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id]
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const daySpots = function(){
    for(let i = 0; i < state.day.length; i++){
      if(state.days[i]['name'] === state.day){
        const newDays = [ ...state.days ];
        newDays[i]['spots'] = state.days[i]['spots'] + 1; 
         return newDays;
      } 
    }
  }

  const spots = daySpots();

  const sendDeleteRequest = async () => {
        const resp = await axios.delete(`http://localhost:8001/api/appointments/${id}`);
        setState({
          ...state, appointments, days:spots
        })
        console.log(resp.data);
  }
  return sendDeleteRequest(); 
}

  const setDay = day => setState({ ...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days", {
      proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 8001
      }
    }),
    axios.get("http://localhost:8001/api/appointments", {
      proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 8001
      }
    }),
    axios.get("http://localhost:8001/api/interviewers", {
      proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 8001
      }
    })
    ]).then((all) => {
      // console.log(all[0].data);
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}