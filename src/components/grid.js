import React, { useEffect, useState } from "react";

const Grid = (props) => {
  const { guessArray, answer } = props;

  const colors = {
    default: `rgb(36, 36, 36)`,
    unused: `rgb(111, 111, 111)`,
    somewhere: `rgb(176, 150, 7)`,
    correct: `rgb(27, 128, 6)`,
  };

  const GetColor = (answer, columnIndex, character) => {
    if (answer[columnIndex] === character) {
      return colors.correct;
    }

    if (answer.indexOf(character) > -1) {
      return colors.somewhere;
    } else {
      return colors.unused;
    }
  };

  return (
    <>
      {guessArray.map((row, rowIndex) => (
        <div
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
                background:
                  column.length > 0
                    ? GetColor(answer, columnIndex, column)
                    : colors.default,
                borderRadius: `6px`,
                width: `40px`,
                height: `40px`,
                margin: `1px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                color: `#fff`,
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

export default Grid;
