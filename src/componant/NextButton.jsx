import ACTIONS from "../actions";

const NextButton = ({ dispatch, answer, index, numOfQuestions }) => {
  const btnText = index < numOfQuestions - 1 ? "Next" : "Finished";
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        if (index + 1 === numOfQuestions) dispatch({ type: ACTIONS.RESULT });
        dispatch({ type: ACTIONS.NEXT_QUESTION });
      }}
    >
      {btnText}
    </button>
  );
};

export default NextButton;
