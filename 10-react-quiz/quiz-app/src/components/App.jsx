import { useEffect, useReducer } from 'react';

import Header from './Header.jsx';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import axios from 'axios';
import StartScreen from './StartScreen';
import Question from './Question';
import NextBtn from './NextBtn';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const initalState = {
  questions: [],
  currentQuestion: 0,
  // Application status
  // 'loading', 'ready', 'error', 'active', 'finished'
  status: 'loading',
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: 300,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataError':
      return { ...state, status: 'error' };
    case 'startQuiz':
      return { ...state, status: 'active' };
    case 'newAnswer':
      const question = state.questions[state.currentQuestion];
      const points =
        action.payload !== question.correctOption ? 0 : question.points;

      return { ...state, answer: action.payload, score: state.score + points };
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case 'finishQuiz':
      const score =
        state.score > state.highscore ? state.score : state.highscore;

      return { ...state, status: 'finished', highscore: score };

    case 'restartQuiz':
      return {
        ...initalState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };
    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const maxScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8000/questions');

        dispatch({ type: 'dataReceived', payload: res.data });
      } catch (err) {
        dispatch({ type: 'dataError' });
      }
    };

    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              maxScore={maxScore}
              index={currentQuestion}
              numQuestions={numQuestions}
              score={score}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextBtn
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              currentQuestion={currentQuestion}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            score={score}
            maxScore={maxScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
