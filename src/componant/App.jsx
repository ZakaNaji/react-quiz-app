import { useReducer } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Loader from "./Loader";
import Error from "./Error";
import Starter from "./Starter";
import Questions from "./Questions";
import ACTIONS from "../actions";
import NextButton from "./NextButton";
import { STATUS } from "../actions";
import Progress from "./Progress";
import Finished from "./Finished";
import Timer from "./Timer";

const URL = "http://localhost:8182/questions";
const SECONDS_PER_QUESTION = 30;
const initState = {
  questions: [],
  status: STATUS.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.DATA_RECEIVED:
      return { ...state, questions: payload, status: STATUS.READY };
    case ACTIONS.DATA_FAILED:
      return { ...state, status: STATUS.ERROR };
    case ACTIONS.START:
      return {
        ...state,
        status: STATUS.ACTIVE,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case ACTIONS.NEW_ANSWER:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: payload,
        points:
          payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTIONS.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };
    case ACTIONS.RESULT:
      return {
        ...state,
        status: STATUS.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ACTIONS.RESET:
      return {
        ...initState,
        status: STATUS.READY,
        highscore: state.highscore,
        questions: state.questions,
      };
    case ACTIONS.TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? STATUS.FINISHED : state.status,
      };
  }
};

function App() {
  const [
    { status, questions, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initState);
  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (pre, curr) => pre + curr.points,
    0
  );

  useEffect(() => {
    fetch(URL)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: ACTIONS.DATA_RECEIVED, payload: data }))
      .catch((err) => dispatch({ type: ACTIONS.DATA_FAILED }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Body>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && (
          <Starter
            handleClick={() => dispatch({ type: ACTIONS.START })}
            numOfQuestions={numOfQuestions}
          />
        )}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              index={index}
              numQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                numOfQuestions={numOfQuestions}
                index={index}
                dispatch={dispatch}
                answer={answer}
              />
            </footer>
          </>
        )}
        {status === STATUS.FINISHED && (
          <Finished
            points={points}
            maxPointsPossible={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Body>
    </div>
  );
}

export default App;
