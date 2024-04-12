import React from "react";
import Quizes from "./Components/Quizes";

const App = () => {
  const [isHomePage, setIsHomePage] = React.useState(true);

  return isHomePage ? (
    <div className="main-page">
      <h1>Quizzicle</h1>
      <button onClick={() => setIsHomePage(false)}>Start Quiz</button>
    </div>
  ) : (
    <Quizes />
  );
};

export default App;
