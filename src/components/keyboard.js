import React from "react";

const Keyboard = (props) => {
  const { guessArray, answer, SetGuessInput } = props;

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const GetKeyColor = (letter) => {
    const colors = [
      "",
      `rgb(36, 36, 36)`,
      `rgb(111, 111, 111)`,
      `rgb(176, 150, 7)`,
      `rgb(27, 128, 6)`,
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
        <div
          key={`row-${rowIndex}`}
          style={{
            display: `flex`,
            flexDirection: `row`,
            margin: `8px`,
          }}
        >
          {row.map((column, columnIndex) => (
            <div
              key={`column-${rowIndex}-${columnIndex}`}
              style={{
                background: GetKeyColor(column),
                borderRadius: `6px`,
                width: `30px`,
                height: `40px`,
                margin: `1px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                color: `#fff`,
                cursor: `pointer`,
              }}
              onClick={() => {
                SetGuessInput(column);
              }}
            >
              {column ? column : ``}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
