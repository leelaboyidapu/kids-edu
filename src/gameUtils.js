// Game logic functions

const words = ["elephant", "giraffe", "kangaroo", "hippopotamus", "crocodile"];
const divisors = [2, 3, 4, 5, 6, 7, 9, 10, 11];

export function generateMultiplicationQuestion() {
  const num1 = Math.floor(Math.random() * 15) + 1;
  const num2 = Math.floor(Math.random() * 15) + 1;
  return { num1, num2, answer: num1 * num2 };
}

export function generateSpellingQuestion() {
  const word = words[Math.floor(Math.random() * words.length)];
  return { word };
}

export function generateDivisibilityQuestion() {
  // 1. Pick digit length equally
  const digitLengths = [2, 3, 4, 5];
  const digits = digitLengths[Math.floor(Math.random() * digitLengths.length)];

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  // 2. Pick divisor
  const divisor = divisors[Math.floor(Math.random() * divisors.length)];

  // 3. Decide answer (75% yes, 25% no)
  const shouldBeDivisible = Math.random() < 0.75;

  let number;

  if (shouldBeDivisible) {
    // Generate a divisible number
    const minMultiplier = Math.ceil(min / divisor);
    const maxMultiplier = Math.floor(max / divisor);
    const multiplier =
      Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
      minMultiplier;

    number = multiplier * divisor;
  } else {
    // Generate a non-divisible number
    do {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (number % divisor === 0);
  }

  return {
    number,
    divisor,
    answer: shouldBeDivisible ? "yes" : "no",
  };
}

export function checkAnswer(testType, input, question) {
  if (testType === "multiplication") {
    return parseInt(input) === question.answer;
  } else if (testType === "spelling") {
    return input.trim().toLowerCase() === question.word.toLowerCase();
  } else if (testType === "divisibility") {
    return input.trim().toLowerCase() === question.answer;
  }
  return false;
}
