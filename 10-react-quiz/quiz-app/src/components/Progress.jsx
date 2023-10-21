function Progress({ index, numQuestions, score, maxScore, answer }) {
  return (
    <header className="progress">
      <progress
        value={answer !== null ? index + 1 : index}
        max={numQuestions}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}

export default Progress;
