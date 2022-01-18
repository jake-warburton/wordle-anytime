import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import { GetColor } from "../functions/get-color";

const Grid = (props) => {
  const { guessArray, answer } = props;

  return (
    <>
      {guessArray.map((row, rowIndex) => (
        <Flex key={`row-${rowIndex}`} m={2}>
          {row.map((column, columnIndex) => (
            <Box
              w={["50px", "60px", "70px"]}
              h={["50px", "60px", "70px"]}
              key={`column-${rowIndex}-${columnIndex}`}
              style={{
                background:
                  column.length > 0
                    ? GetColor(answer, columnIndex, column)
                    : "rgba(36, 36, 36, 0.9)",
                borderRadius: `2px`,
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
