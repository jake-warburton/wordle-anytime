import Head from "next/head";
import React, { useEffect, useState } from "react";
import { words } from "../../public/static/words";

import Grid from "../components/grid";
import Keyboard from "../components/keyboard";

export default function Home() {
  const [victory, SetVictory] = useState(false);
  const [guessArray, SetGuessArray] = useState([]);
  const [guessInput, SetGuessInput] = useState("");
  const [feedback, SetFeedback] = useState(null);
  const [answer, SetAnswer] = useState(null);

  const NewGame = () => {
    //  Wipe the board clean and get a new answer
    SetVictory(false);
    SetGuessInput("");
    SetFeedback(null);

    const newGuessArray = [];
    const rowsLength = 6;
    const columnsLength = 5;

    for (let i = 0; i < rowsLength; i += 1) {
      const newRow = [];

      for (let j = 0; j < columnsLength; j += 1) {
        newRow.push("");
      }

      newGuessArray.push(newRow);
    }

    SetGuessArray(newGuessArray);

    //  Set a new random answer
    const randomNumber = Math.floor(Math.random() * words.length);
    const randomWord = words[randomNumber].toUpperCase();

    SetAnswer(randomWord);
  };

  useEffect(() => {
    NewGame();
  }, []);

  const SetRow = (newGuess) => {
    let tempGuessArray = [...guessArray];
    let updatedFlag = false;

    for (let i = 0; i < tempGuessArray.length; i += 1) {
      if (!updatedFlag && tempGuessArray[i][0] === "") {
        for (let j = 0; j < tempGuessArray[i].length; j += 1) {
          tempGuessArray[i][j] = newGuess[j].toUpperCase();
        }

        updatedFlag = true;
      }
    }

    SetGuessArray(tempGuessArray);
  };

  const AttemptGuess = (newGuess) => {
    SetRow(newGuess);

    let victoryFlag = false;
    //  If the guess is correct, set victory condition

    if (newGuess.toUpperCase() === answer.toUpperCase()) {
      SetVictory(true);
      victoryFlag = true;
    }

    if (!victoryFlag) {
      //  Guess was not correct, continue with the game
      //  Spellcheck the guess to make sure it is a correct word

      let correctSpelling = true;

      /*
      const Typo = require("typo-js");
      const dictionary = new Typo("en_gb");
      correctSpelling = dictionary.check(newGuess);
      console.log("JAKE correct: ", correctSpelling);
      */

      if (!correctSpelling) {
        SetFeedback("Incorrect spelling or not a word.");
      } else {
        SetFeedback(null);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Wordle Whenever</title>
      </Head>
      <div
        style={{
          width: `100%`,
          height: `90vh`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <div>
          <Grid answer={answer} guessArray={guessArray} />
        </div>

        {(guessArray.length > 0 && guessArray[guessArray.length - 1][0]) ||
        victory ? (
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              margin: `10px 0px`,
            }}
          >
            <p>{victory ? `Good job!` : `You lost! The word was ${answer}`}</p>

            <button
              onClick={() => {
                NewGame();
              }}
            >
              New Game
            </button>
          </div>
        ) : (
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              margin: `10px 0px`,
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                SetGuessInput("");
              }}
            >
              <input
                value={guessInput}
                onChange={(e) => {
                  SetGuessInput(e.target.value.slice(0, 5));
                }}
              />

              <button
                onClick={() => {
                  if (guessInput.length == 5) {
                    AttemptGuess(guessInput);
                  }
                }}
              >
                Guess
              </button>
            </form>

            {feedback ? (
              <div
                style={{
                  color: `red`,
                }}
              >
                {feedback}
              </div>
            ) : (
              ``
            )}
          </div>
        )}

        <Keyboard
          answer={answer}
          guessArray={guessArray}
          SetGuessInput={(input) => {
            const newGuessInput = guessInput + input;

            SetGuessInput(newGuessInput.slice(0, 5));
          }}
        />
      </div>
    </>
  );
}
