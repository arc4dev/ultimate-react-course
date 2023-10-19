import { useEffect, useReducer } from 'react';
import Header from './Header.jsx';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import axios from 'axios';
import StartScreen from './StartScreen';
import Question from './Question';

const initalState = {
  questions: [],
  currentQuestion: 0,
  // Application status
  // 'loading', 'ready', 'error', 'active', 'finished'
  status: 'loading',
  answer: null,
  score: 0,
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
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [{ questions, status, currentQuestion, answer }, dispatch] = useReducer(
    reducer,
    initalState
  );
  const numQuestions = questions.length;

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
          <Question
            question={questions[currentQuestion]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
