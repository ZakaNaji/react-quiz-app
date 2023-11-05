import { useEffect } from "react";
import ACTIONS from "../actions";

const Timer = ({ secondsRemaining, dispatch }) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: ACTIONS.TICK });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
