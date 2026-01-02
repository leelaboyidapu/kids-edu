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

// export function generateDivisibilityQuestion() {
//   const number = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // Random number between 10 and 99999
//   const divisor = divisors[Math.floor(Math.random() * divisors.length)];
//   const answer = (number % divisor === 0) ? "yes" : "no";
//   return { number, divisor, answer };
// }

export function generateDivisibilityQuestion() {
  // Step 1: Pick digit length with equal probability
  const digitLengths = [2, 3, 4, 5];
  const digits = digitLengths[Math.floor(Math.random() * digitLengths.length)];

  // Step 2: Generate number within the selected digit range
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  // Step 3: Pick divisor
  const divisor = divisors[Math.floor(Math.random() * divisors.length)];

  // Step 4: Compute answer
  const answer = number % divisor === 0 ? "yes" : "no";

  return { number, divisor, answer };
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
