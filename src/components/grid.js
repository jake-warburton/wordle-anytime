import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import { GetColor } from "../functions/get-color";

const Grid = (props) => {
  const { guessArray, answer } = props;

  return (
    <>
      {guessArray.map((row, rowIndex) => (
        <Flex key={`row-${rowIndex}`} m={5}>
          {row.map((column, columnIndex) => (
            <Box
              key={`column-${rowIndex}-${columnIndex}`}
              style={{
                background:
                  column.length > 0
                    ? GetColor(answer, columnIndex, column)
                    : "rgb(36, 36, 36)",
                borderRadius: `6px`,
                width: `50px`,
                height: `50px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                color: `#fff`,
                border: `1px #808080 solid`,
              }}
              mx={1}
            >
              <Text fontSize={28} fontWeight={700}>
                {column ? column : ``}
              </Text>
            </Box>
          ))}
        </Flex>
      ))}
    </>
  );
};

export default Grid;
