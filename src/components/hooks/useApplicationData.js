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

    const sendPutRequest = async () => {

          const resp = await axios.put(`http://localhost:8001/api/appointments/${id}`, appointment);
          setState({
            ...state, appointments
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

  const sendDeleteRequest = async () => {
        const resp = await axios.delete(`http://localhost:8001/api/appointments/${id}`);
        setState({
          ...state, appointments
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