import AnswerTag from "./answerTag";

export default function QuestionTray(props) {
  const answerElement = props.answers.map((answer, index) => (
    <AnswerTag
      id={props.id}
      key={index}
      answer={answer}
      onclick={props.onclick}
      holdingAnswer={props.holdingAnswer}
      checkAnswer={props.checkAnswer}
      correctAnswer={props.correctAnswer}
    />
  ));

  return (
    <div className="quiz">
      <h2 className="question">{props.question}</h2>
      <div className="answers-tray">{answerElement}</div>
      <hr />
    </div>
  );
}
