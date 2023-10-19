function StartScreen({ numQuestions, dispatch }) {
  const handleStart = () => {
    dispatch({ type: 'startQuiz' });
  };

  return (
    <div className="start">
      <h2>Welcome to the React Quizz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button onClick={handleStart} className="btn" type="button">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
