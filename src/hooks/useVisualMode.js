import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory((history) => [...history]);
    } else {
      setHistory((history) => [...history, newMode]);
    }
  };

  const back = () => {
    const newHistory = [...history];
    newHistory.pop();
    setMode([...newHistory].pop());
    setHistory([...newHistory]);
  };

  return {
    mode,
    transition,
    back,
  };
}
