import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Flex,
  Box,
  Button,
  Input,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { IoMdRefresh } from "react-icons/io";
import { FiMoon, FiSun } from "react-icons/fi";

import Grid from "../components/grid";
import Keyboard from "../components/keyboard";

//  Data
import { words } from "../../public/static/words";
import { sort } from "../functions/quicksort";
import { SearchSortedWordsList } from "../functions/search-sorted-words-list";
import { CreateSeed, UseSeed } from "../functions/seed";
import { GetEmoji } from "../functions/get-color";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  const [victory, SetVictory] = useState(false);
  const [guessArray, SetGuessArray] = useState([]);
  const [guessInput, SetGuessInput] = useState("");
  const [feedback, SetFeedback] = useState(null);
  const [seed, SetSeed] = useState(null);
  const [answer, SetAnswer] = useState(null);
  const [wordsSorted, SetWordsSorted] = useState(
    sort(words, (a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    })
  );

  const SendToClipboard = () => {
    const baseUrl = "https://wordle-whenever.vercel.app/";
    const copyText = "";

    copyText += `Wordle Whenever `;

    let numAttempts = 0;

    let emojiGrid = "";
    for (let i = 0; i < guessArray.length; i += 1) {
      if (guessArray[i][0] != "") {
        numAttempts += 1;
        for (let j = 0; j < guessArray[i].length; j += 1) {
          emojiGrid += `${GetEmoji(answer, j, guessArray[i][j])}`;
        }

        emojiGrid += `\n`;
      }
    }

    if (!victory) {
      numAttempts = "X";
    }

    copyText += `${numAttempts}/6\n\n${emojiGrid}\n\n${baseUrl}?seed=${seed}`;

    window.navigator.clipboard.writeText(copyText);
  };

  const NewGame = (useSeed = true) => {
    //  Wipe the board clean and get a new answer
    SetVictory(false);
    SetGuessInput("");
    SetFeedback(null);

    //  Auto select the input
    const guessInputBox = document.getElementById("guess-input-box");
    if (guessInput) {
      guessInputBox.focus();
      guessInputBox.select();
    }

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

    let newAnswerIndex = 0;

    let setSeed = null;
    if (router?.asPath && router.asPath.indexOf("seed=") > -1) {
      const { asPath } = router;
      if (asPath) {
        setSeed = asPath.split("seed=")[1].split("&")[0];
      }
    }

    if (useSeed && setSeed) {
      const seedIndex = UseSeed(setSeed);
      if (wordsSorted[seedIndex]) {
        newAnswerIndex = seedIndex;
      } else {
        SetFeedback("Seed is not valid.");
      }
    } else {
      //  Set a new random answer
      const randomNumber = Math.floor(Math.random() * wordsSorted.length);

      newAnswerIndex = randomNumber;
    }

    SetSeed(CreateSeed(newAnswerIndex));

    SetAnswer(wordsSorted[newAnswerIndex].toUpperCase());
  };

  useEffect(() => {
    if (wordsSorted && wordsSorted.length > 0) {
      NewGame();
    }
  }, [wordsSorted]);

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
    const thisGuess = newGuess.toUpperCase();

    if (SearchSortedWordsList(thisGuess, wordsSorted)) {
      SetRow(thisGuess);
      SetGuessInput("");

      //  If the guess is correct, set victory condition
      if (thisGuess === answer.toUpperCase()) {
        SetVictory(true);
      }

      SetFeedback(null);
    } else {
      SetFeedback(`${newGuess.toUpperCase()} is not in my list of words.`);
      SetGuessInput("");
    }
  };

  return (
    <>
      <Head>
        <title>Wordle Whenever</title>
      </Head>
      <Flex direction="column" h="100vh" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize={28} fontWeight={700}>
            Wordle Whenever
          </Text>

          <Flex ml={10} mt={1} alignItems="center" justifyContent="center">
            <Box
              fontSize="2xl"
              mr={2}
              pb={1}
              onClick={() => {
                toggleColorMode();
              }}
              cursor="pointer"
            >
              {colorMode === "light" ? <FiSun /> : <FiMoon />}
            </Box>
            <Switch
              size="md"
              onChange={() => {
                toggleColorMode();
              }}
              isChecked={colorMode === "dark"}
            />
          </Flex>
        </Flex>
        <Flex
          style={{
            width: `100%`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <Box>
            <Grid answer={answer} guessArray={guessArray} />
          </Box>

          {(guessArray.length > 0 && guessArray[guessArray.length - 1][0]) ||
          victory ? (
            <Box
              style={{
                display: `flex`,
                flexDirection: `column`,
                margin: `10px 0px`,
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={21}>
                {victory ? `Good job!` : `You lost! The word was ${answer}`}
              </Text>

              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  w="200px"
                  mb={4}
                  onClick={() => {
                    SendToClipboard();
                  }}
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Box mr={2}>Share</Box>
                  </Flex>
                </Button>

                <Button
                  w="200px"
                  onClick={() => {
                    NewGame(false); //  Do not use the seed in the URL
                  }}
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Box mr={2}>New Game</Box> <IoMdRefresh />
                  </Flex>
                </Button>
              </Flex>
            </Box>
          ) : (
            <Box
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`,
                margin: `10px 0px`,
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (guessInput.length == 5) {
                    AttemptGuess(guessInput);
                  }
                }}
              >
                <Flex>
                  <Input
                    id="guess-input-box"
                    value={guessInput}
                    onChange={(e) => {
                      SetGuessInput(e.target.value.slice(0, 5));
                    }}
                    mr={2}
                  />

                  <Button type="submit">Guess</Button>
                </Flex>
              </form>

              {feedback ? <Text fontSize={16}>{feedback}</Text> : ``}
            </Box>
          )}
        </Flex>

        <Flex w="100%" alignItems="center" justifyContent="center">
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Keyboard
              answer={answer}
              guessArray={guessArray}
              SetGuessInput={(input) => {
                const newGuessInput = guessInput + input;
                SetGuessInput(newGuessInput.slice(0, 5));
              }}
              RemoveGuessInput={() => {
                const newGuessInput = guessInput.slice(
                  0,
                  guessInput.length - 1
                );
                SetGuessInput(newGuessInput.slice(0, 5));
              }}
              AttemptGuess={() => {
                if (guessInput.length == 5) {
                  AttemptGuess(guessInput);
                }
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
