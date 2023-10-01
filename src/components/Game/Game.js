import React, { useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Alert from "../Alert/Alert";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [userInput, setUserInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [isGuessed, setIsGuessed] = useState(false);

  const handleOnInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (inputs.indexOf(userInput) !== -1) return;

    setInputs([...inputs, userInput]);
    setIsGuessed(areAllCorrect(checkGuess(userInput, answer)));
    setUserInput("");
  };

  return (
    <>
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((idx) => (
          <Guess key={idx} pidx={idx} guess={inputs?.[idx] || ""} />
        ))}
      </div>
      <form
        className="guess-input-wrapper"
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        {isGuessed ? (
          <Alert type="happy">
            <strong>Congratualations! </strong>Got it in{" "}
            <strong>{inputs.length} guessess</strong>
          </Alert>
        ) : !isGuessed && inputs.length === 6 ? (
          <Alert type="sad">
            Sorry, the correct answer is <strong>{answer}</strong>
          </Alert>
        ) : (
          <input
            id="guess-input"
            type="text"
            value={userInput}
            onChange={handleOnInputChange}
            min={5}
            pattern=".{5,5}"
            title="Please enter exactly 5 characters."
          />
        )}
      </form>
    </>
  );
}

function Guess({ guess, pidx }) {
  const guessResponse = checkGuess(guess, answer);
  return (
    <p className="guess">
      {range(5).map((idx) => (
        <span
          className={`cell ${guessResponse?.[idx]?.status}`}
          key={`${pidx}-${idx}`}
        >
          {guess?.[idx] || ""}
        </span>
      ))}
    </p>
  );
}

function areAllCorrect(arr) {
  return arr.every(
    (obj) => obj.hasOwnProperty("status") && obj.status === "correct"
  );
}


export default Game;
