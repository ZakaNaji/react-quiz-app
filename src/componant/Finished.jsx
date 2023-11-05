import ACTIONS from "../actions";

const Finished = ({ points, maxPointsPossible, highscore, dispatch }) => {
  const percent = (points / maxPointsPossible) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPointsPossible} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTIONS.RESET })}
      >
        Reset
      </button>
    </>
  );
};

export default Finished;
