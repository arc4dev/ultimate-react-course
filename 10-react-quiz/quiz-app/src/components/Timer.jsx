import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      if (secondsRemaining <= 0) {
        dispatch({ type: 'finishQuiz' });
      }

      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch, secondsRemaining]);

  return (
    <div className="timer">
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
}

export default Timer;
