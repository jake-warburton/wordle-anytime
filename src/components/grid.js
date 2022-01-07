import React, { useEffect, useState } from "react";

import { GetColor } from "../functions/get-color";

const Grid = (props) => {
  const { guessArray, answer } = props;

  return (
    <>
      {guessArray.map((row, rowIndex) => (
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
                background:
                  column.length > 0
                    ? GetColor(answer, columnIndex, column)
                    : "rgb(36, 36, 36)",
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
