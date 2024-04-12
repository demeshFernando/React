import React from "react";
import QuestionTray from "./QuestionTray";

export default function Quizes() {
  const [question, setQuestion] = React.useState([
    {
      type: "multiple",
      difficulty: "easy",
      category: "Celebrities",
      question: "Gwyneth Paltrow has a daughter named...?",
      correct_answer: "Apple",
      incorrect_answers: ["Lily", "French", "Dakota"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "General Knowledge",
      question: "Chartreuse is a color between yellow and what?",
      correct_answer: "Green",
      incorrect_answers: ["Red", "Black", "Purple"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Sports",
      question:
        "The Rio 2016 Summer Olympics held it&#039;s closing ceremony on what date?",
      correct_answer: "August 21",
      incorrect_answers: ["August 23", "August 19", "August 17"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "General Knowledge",
      question: "Haggis is traditionally ate on Burns Night.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Sports",
      question:
        "Who is Manchester United&#039;s top premier league goal scorer?",
      correct_answer: "Wayne Rooney",
      incorrect_answers: ["Sir Bobby Charlton", "Ryan Giggs", "David Beckham"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Entertainment: Music",
      question:
        "What is the name of the 2016 mixtape released by Venezuelan electronic producer Arca?",
      correct_answer: "Entra&ntilde;as",
      incorrect_answers: ["&amp;&amp;&amp;&amp;&amp;&amp;", "Sheep", "Xen"],
    },
    {
      type: "boolean",
      difficulty: "easy",
      category: "Science &amp; Nature",
      question:
        "An exothermic reaction is a chemical reaction that releases energy by radiating electricity.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Entertainment: Video Games",
      question: "In Portal, what color is the Morality Core?",
      correct_answer: "Purple",
      incorrect_answers: ["Red", "Yellow", "Blue"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Entertainment: Music",
      question:
        "Bj&ouml;rk&#039;s &quot;Unison&quot; contains a sample of which Oval song?",
      correct_answer: "Aero Deck",
      incorrect_answers: ["Textuell", "Panorama", "Do While"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Celebrities",
      question: "What was the name of Marilyn Monroe&#039;s first husband?",
      correct_answer: "James Dougherty",
      incorrect_answers: ["Joe Dimaggio", "Kirk Douglas", "Arthur Miller"],
    },
  ]);
  const [answer, setAnswer] = React.useState([
    {
      answers: [
        "Mental Health Issues",
        "Injuries",
        "Disease",
        "Danger to Others",
      ],
      onHold: "",
    },
    {
      answers: ["Jonathan Ive", "Steve Jobs", "Ronald Wayne", "Steve Wozniak"],
      onHold: "",
    },
    {
      answers: [
        "Irish Republican Army",
        "Irish Rebel Alliance",
        "Irish Reformation Army",
        "Irish-Royal Alliance",
      ],
      onHold: "",
    },
    {
      answers: [
        "Will Stamper",
        "Steve Blum",
        "Richard Epcar",
        "Yuri Lowenthal",
      ],
      onHold: "",
    },
    {
      answers: [
        "Cognitive Dissonance",
        "Flip-Flop Syndrome",
        "Split-Brain",
        "Blind Sight",
      ],
      onHold: "",
    },
    {
      answers: [
        "Francis, Bill, Zoey, and Louis",
        "Bender, Andrew, Allison, and Brian",
        "Coach, Ellis, Nick, and Rochelle",
        "Harry, Ron, Hermione and Dumbledore",
      ],
      onHold: "",
    },
    {
      answers: [
        "Look into sky and yell loudly in mourning.",
        "Kiss the jagged forehead before burial.",
        "Shoot into space in a torpedo casing.",
        "Split the deceased&#039;s earnings between bloodkin.",
      ],
      onHold: "",
    },
    { answers: ["Zhao Yun", "Liu Bei", "Guan Yu", "Zhang Fei"], onHold: "" },
    {
      answers: ["Phoenix", "Montgomery", "Tallahassee", "Raleigh"],
      onHold: "",
    },
    { answers: ["True", "False"], onHold: "" },
  ]);
  const [isCheckAnswer, setisCheckAnswer] = React.useState(false);
  const [playAgain, setPlayAgain] = React.useState(false);

  React.useEffect(() => {
    if (playAgain) {
      fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => response.json())
        .then((data) => setQuestion(data.results))
        .catch((error) => console.error("Error in the code: " + error));
      setPlayAgain(false);
    }
  }, [playAgain]);

  React.useEffect(() => {
    let newAnswers = [];
    for (let i = 0; i < question.length; i++) {
      let answers = [];
      const incorrectAnswers = question[i].incorrect_answers;
      for (let j = 0; j < incorrectAnswers.length; j++) {
        answers.push(incorrectAnswers[j]);
      }
      answers.push(question[i].correct_answer);

      for (let k = 0; k < answers.length; k++) {
        const swappingIndex = Math.round(Math.random() * k);
        const temp = answers[k];
        answers[k] = answers[swappingIndex];
        answers[swappingIndex] = temp;
      }

      newAnswers.push({
        answers: answers,
        onHold: "",
      });
    }
    setAnswer(newAnswers);
  }, [question]);

  function setAnswerClick(answerIndex, answer) {
    setAnswer((prevAnswers) =>
      prevAnswers.map((consideringAnswer, index) => {
        return answerIndex === index
          ? { ...consideringAnswer, onHold: answer }
          : consideringAnswer;
      })
    );
  }

  function checkAnswer() {
    setisCheckAnswer((prevStatus) => {
      return (prevStatus = !prevStatus);
    });

    if (isCheckAnswer) {
      setPlayAgain(true);
    }
  }

  function getCorrectAnswerCount() {
    if (!isCheckAnswer) {
      return -1;
    } else {
      let count = 0;
      for (let i = 0; i < answer.length; i++) {
        if (answer[i].onHold === question[i].correct_answer) {
          count++;
        }
      }
      return count;
    }
  }

  const questionsTray = question.map((question, index) => {
    return (
      <QuestionTray
        key={index}
        question={question.question}
        answers={answer[index].answers}
        onclick={setAnswerClick}
        holdingAnswer={answer[index].onHold}
        id={index}
        checkAnswer={isCheckAnswer}
        correctAnswer={question.correct_answer}
      />
    );
  });

  return (
    <div className="quiz-tray">
      {questionsTray}
      <div className="button">
        {isCheckAnswer && (
          <h2 className="final-answer">
            Your Scored {getCorrectAnswerCount()}/10 answers
          </h2>
        )}
        <button onClick={checkAnswer}>
          {isCheckAnswer ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
}
