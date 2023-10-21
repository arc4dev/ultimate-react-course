function NextBtn({ dispatch, answer, numQuestions, currentQuestion }) {
  if (answer === null) return null;

  const isLastQuestion = currentQuestion >= numQuestions - 1;

  return (
    <button
      onClick={
        isLastQuestion
          ? () => dispatch({ type: 'finishQuiz' })
          : () => dispatch({ type: 'nextQuestion' })
      }
      className="btn btn-ui"
      type="button">
      {isLastQuestion ? 'Finish' : 'Next'}
    </button>
  );
}

export default NextBtn;
