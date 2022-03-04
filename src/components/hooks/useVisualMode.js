import { useState } from "react";

export function useVisualMode(initial) {

  const[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode: mode,
    transition: (newMode, replace = false) => {
      setMode(newMode);
      history.push(mode);
      if(replace){
        history.pop(mode);
      }
    },
    back: () => {
      setMode(history.pop());
    }
  };

}