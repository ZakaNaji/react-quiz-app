import { useReducer } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Loader from "./Loader";
import Error from "./Error";
import Starter from "./Starter";
import Questions from "./Questions";
import ACTIONS from "../actions";
import { STATUS } from "../actions";

const URL = "http://localhost:8182/questions";

const initState = {
  questions: [],
  status: STATUS.LOADING,
  index: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.DATA_RECEIVED:
      return { ...state, questions: payload, status: STATUS.READY };
    case ACTIONS.DATA_FAILED:
      return { ...state, status: STATUS.ERROR };
    case ACTIONS.START:
      return { ...state, status: STATUS.ACTIVE };
  }
};

function App() {
  const [{ status, questions, index }, dispatch] = useReducer(
    reducer,
    initState
  );
  const numOfQuestions = questions.length;

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
        {status === STATUS.ACTIVE && <Questions question={questions[index]} />}
      </Body>
    </div>
  );
}

export default App;
