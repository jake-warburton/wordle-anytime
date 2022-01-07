export const GetColor = (answer, columnIndex, character) => {
  const colors = {
    default: `rgb(36, 36, 36)`,
    unused: `rgb(111, 111, 111)`,
    somewhere: `rgb(176, 150, 7)`,
    correct: `rgb(27, 128, 6)`,
  };

  if (answer[columnIndex] === character) {
    return colors.correct;
  }

  if (answer.indexOf(character) > -1) {
    return colors.somewhere;
  } else {
    return colors.unused;
  }
};
