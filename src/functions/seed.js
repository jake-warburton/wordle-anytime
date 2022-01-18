const salt = 39764629586;
const factor = 9847;

export const CreateSeed = (inputNumber) => {
  return inputNumber * factor + salt;
};

export const UseSeed = (seed) => {
  return Math.floor((seed - salt) / factor);
};
