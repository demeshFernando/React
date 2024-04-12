export default function AnswerTag(props) {
  function getDeservingColor() {
    if (props.checkAnswer) {
      if (
        (props.holdingAnswer === "" && props.answer === props.correctAnswer) ||
        (props.holdingAnswer === props.answer &&
          props.answer === props.correctAnswer) ||
        props.answer === props.correctAnswer
      ) {
        return "#94d7a2";
      } else if (
        props.holdingAnswer === props.answer &&
        props.answer != props.correctAnswer
      ) {
        return "#f7d9db";
      } else {
        return "transparent";
      }
    } else {
      if (props.answer === props.holdingAnswer) {
        return "#D6DBF5";
      } else {
        return "transparent";
      }
    }
  }
  const styles = {
    backgroundColor: getDeservingColor(),
    color: props.holdingAnswer === props.answer ? "#293264" : "black",
  };
  return (
    <div
      style={styles}
      className="answer"
      onClick={() => props.onclick(props.id, props.answer)}
    >
      {props.answer}
    </div>
  );
}
