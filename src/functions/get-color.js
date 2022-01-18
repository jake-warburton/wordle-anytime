export const GetColor = (answer, columnIndex, character) => {
  const colors = {
    default: `rgba(36, 36, 36, 0.9)`,
    unused: `rgba(111, 111, 111, 0.9)`,
    somewhere: `rgba(176, 150, 7, 0.9)`,
    correct: `rgba(27, 128, 6, 0.9)`,
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

export const GetEmoji = (answer, columnIndex, character) => {
  const colors = {
    default: `⬛`,
    unused: `⬛`,
    somewhere: `🟨`,
    correct: `🟩`,
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
