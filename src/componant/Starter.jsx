export default function Starter({ numOfQuestions, handleClick }) {
  return (
    <div className="start">
      <h2>Welcon to the quez</h2>
      <h3>{numOfQuestions} quetions to test your mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's start
      </button>
    </div>
  );
}
