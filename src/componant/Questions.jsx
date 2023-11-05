import ACTIONS from "../actions";

export default function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            disabled={answer}
            className={`btn btn-option ${answer === index ? "answer" : ""}
            ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() =>
              dispatch({ type: ACTIONS.NEW_ANSWER, payload: index })
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
