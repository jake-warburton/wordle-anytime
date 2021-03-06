import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { BsFillBackspaceFill, BsArrowReturnLeft } from "react-icons/bs";

const Keyboard = (props) => {
  const { guessArray, answer, SetGuessInput, RemoveGuessInput, AttemptGuess } =
    props;

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const GetKeyColor = (letter) => {
    const colors = [
      "",
      `rgba(36, 36, 36, 0.9)`,
      `rgba(111, 111, 111, 0.9)`,
      `rgba(176, 150, 7, 0.9)`,
      `rgba(27, 128, 6, 0.9)`,
    ];

    let letterValue = 1;

    let guessString = "";

    for (let i = 0; i < guessArray.length; i += 1) {
      if (guessArray[i][0]) {
        for (let j = 0; j < guessArray[i].length; j += 1) {
          if (guessArray[i][j]) {
            guessString += guessArray[i][j];

            if (
              letterValue < 3 &&
              answer.indexOf(letter) > -1 &&
              guessArray[i][j] === letter
            ) {
              letterValue = 3;
            }

            if (answer[j] === guessArray[i][j] && answer[j] === letter) {
              letterValue = 4;
            }
          }
        }
      }
    }

    if (letterValue < 2 && guessString.indexOf(letter) > -1) {
      letterValue = 2;
    }

    return colors[letterValue];
  };

  return (
    <>
      {keyboardRows.map((row, rowIndex) => (
        <Flex
          key={`row-${rowIndex}`}
          style={{
            display: `flex`,
            flexDirection: `row`,
            margin: `5px`,
          }}
        >
          {row.map((column, columnIndex) => (
            <React.Fragment key={`column-${rowIndex}-${columnIndex}`}>
              {rowIndex === 2 && columnIndex === 0 ? (
                <Button
                  minWidth={0}
                  py={[0, 5, 8]}
                  px={[6, 7, 10]}
                  key={`column-${rowIndex}-${columnIndex}`}
                  style={{
                    background: GetKeyColor(column),
                    width: `30px`,
                    height: `40px`,
                    margin: `1px`,
                    display: `flex`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    color: `#fff`,
                    cursor: `pointer`,
                    border: `1px #808080 solid`,
                    borderRadius: `4px`,
                  }}
                  onClick={() => {
                    RemoveGuessInput();
                  }}
                >
                  <span style={{ fontSize: `1.1rem` }}>
                    <BsFillBackspaceFill />
                  </span>
                </Button>
              ) : (
                ``
              )}
              <Button
                minWidth={0}
                py={[0, 5, 8]}
                px={[0, 5, 6]}
                style={{
                  background: GetKeyColor(column),
                  width: `30px`,
                  height: `40px`,
                  margin: `1px`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  color: `#fff`,
                  cursor: `pointer`,
                  border: `1px #808080 solid`,
                  borderRadius: `4px`,
                }}
                onClick={() => {
                  SetGuessInput(column);
                }}
              >
                {column ? column : ``}
              </Button>
              {rowIndex === 2 && columnIndex === row.length - 1 ? (
                <Button
                  minWidth={0}
                  py={[0, 5, 8]}
                  px={[6, 7, 10]}
                  key={`column-${rowIndex}-${columnIndex}`}
                  style={{
                    background: GetKeyColor(column),
                    width: `30px`,
                    height: `40px`,
                    margin: `1px`,
                    display: `flex`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    color: `#fff`,
                    cursor: `pointer`,
                    border: `1px #808080 solid`,
                    borderRadius: `4px`,
                  }}
                  onClick={() => {
                    AttemptGuess();
                  }}
                >
                  <span style={{ fontSize: `1.1rem` }}>
                    <BsArrowReturnLeft />
                  </span>
                </Button>
              ) : (
                ``
              )}
            </React.Fragment>
          ))}
        </Flex>
      ))}
    </>
  );
};

export default Keyboard;
