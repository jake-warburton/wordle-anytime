const NarrowDown = (
  startingPoint,
  needleAlphabetIndex,
  startingAlphabetIndex,
  haystackCellSize,
  needle,
  haystack
) => {
  let newStartingPoint = startingPoint;

  if (needleAlphabetIndex === startingAlphabetIndex) {
    //  The starting point first letter is equal to the needle first letter
    //  go back one cell and check again to ensure we catch all words beginning with the needle.
    return [newStartingPoint - haystackCellSize, null];
  } else if (needleAlphabetIndex > startingAlphabetIndex) {
    //    We are too early in the word list, work forwards until reach the starting letter
    while (
      haystack[newStartingPoint][0] != needle[0] &&
      newStartingPoint < haystack.length - 1
    ) {
      newStartingPoint += 1;
    }
    return [newStartingPoint, "forwards"];
  } else if (needleAlphabetIndex < startingAlphabetIndex) {
    //  We are too far along in the word list, work backwards until reach the starting letter
    while (haystack[newStartingPoint][0] != needle[0] && newStartingPoint > 0) {
      newStartingPoint -= 1;
    }
    return [newStartingPoint, "back"];
  }

  return false;
};

export const SearchSortedWordsList = (needle, haystack) => {
  const alphabetArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const haystackCellSize = Math.floor(haystack.length / alphabetArray.length);

  //  Get first letter of the needle
  //  Find its number in alphabet e.g. 26 letters, W = 23
  //  haystackCellSize * 23 = starting point
  //  Work down and up from 23 until you find a starting word beginning with W
  //  If immediately landed on W, step back a cell.
  //  If working up and find W, only work up from now on until find word or letter change.
  //  If working down and find W, only work down from now on until find word or letter change.

  const needleAlphabetIndex = alphabetArray.indexOf(needle[0]) + 1;

  let startingPoint = haystackCellSize * needleAlphabetIndex;

  let direction = null;

  while (
    direction == null &&
    startingPoint > 0 &&
    startingPoint < haystack.length - 1
  ) {
    const results = NarrowDown(
      startingPoint,
      needleAlphabetIndex,
      alphabetArray.indexOf(haystack[startingPoint][0]) + 1,
      haystackCellSize,
      needle,
      haystack
    );
    startingPoint =
      results[0] >= 0
        ? results[0] <= haystack.length - 1
          ? results[0]
          : haystack.length - 1
        : 0;
    direction = results[1];
  }

  while (
    needle.toUpperCase() !== haystack[startingPoint].toUpperCase() &&
    needle[0] === haystack[startingPoint][0]
  ) {
    if (direction == "back") {
      startingPoint -= 1;
    } else {
      startingPoint += 1;
    }
  }

  if (needle.toUpperCase() === haystack[startingPoint].toUpperCase()) {
    return true;
  } else {
    return false;
  }
};
