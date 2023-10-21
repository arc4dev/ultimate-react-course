function FinishScreen({ score, maxScore, highscore, dispatch }) {
  const perctange = Math.round((score / maxScore) * 100);

  let emoji;
  if (perctange === 100) emoji = '🥳';
  if (perctange < 100 && perctange >= 80) emoji = '😎';
  if (perctange < 80 && perctange >= 60) emoji = '😀';
  if (perctange < 60 && perctange >= 40) emoji = '😐';
  if (perctange < 40 && perctange >= 20) emoji = '😕';
  if (perctange < 20) emoji = '😱';

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{score}</strong> out of {maxScore} ( {perctange} % )
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        onClick={() => dispatch({ type: 'restartQuiz' })}
        className="btn btn-ui"
        type="button">
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
