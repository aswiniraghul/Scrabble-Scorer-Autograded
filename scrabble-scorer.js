// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 } 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInputOldScrabbleScorer = input.question("Let's play some scrabble! Enter a word: ");
   console.log(oldScrabbleScorer(userInputOldScrabbleScorer));

   let userInputSimpleScorer = input.question("Let's play some scrabble! Enter a word: ");
   console.log(simpleScorer(userInputSimpleScorer));

   let userInputvowelBonusScorer = input.question("Let's play some scrabble! Enter a word: ");
   console.log(vowelBonusScorer(userInputvowelBonusScorer));
};

let simpleScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints += 1;
   }
   return letterPoints;
}

let vowelBonusScorer = function (word) {
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      }
   }
   return letterPoints;
}

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
	let letterPoints = 0;
 
   let newPointStructure = transform(oldPointStructure);
   // newPointStructure[' '] = 0;

	for (let i = 0; i < word.length; i++) {
      if (word[i] in newPointStructure) {
         letterPoints += newPointStructure[word[i]];
      }
	}
	return letterPoints;
}

const scoringAlgorithms = [
   {
     Name: 'Simple Score',
     Description: 'Each letter is worth 1 point.',
     scorerFunction: simpleScorer
   },
   {
     Name: 'Bonus Vowels',
     Description: 'Vowels are 3 points, consonants are 1 point.',
     scorerFunction: vowelBonusScorer
   },
   {
     Name: 'Scrabble',
     Description: 'The traditional scoring algorithm.',
     scorerFunction: scrabbleScorer
   }
 ];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");

   const userSelectedNumber = input.question("Enter 0, 1, or 2: ");

   if (userSelectedNumber >= 0 && userSelectedNumber <= 2) {
      return scoringAlgorithms[userSelectedNumber];
   } else {
      console.log("Invalid input. Please enter a number between 0 and 2.");
      return scorerPrompt();
   }
}

function transform(oldPointStructure) {
   const newPointStructure = {};

   for (const [points, letters] of Object.entries(oldPointStructure)) {
      for (const letter of letters) {
        newPointStructure[letter.toLowerCase()] = parseInt(points);
      }
    }  
    return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

// const newPointStructure = {'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3,
// 'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10};

function runProgram() {
   // initialPrompt();

   let word = input.question("Let's play some scrabble! Enter a word: ");
   var regex = /^[a-zA-Z\s]+$/; //Bonus
   if (!regex.test(word)) {
      return runProgram();
   }

   const score = scorerPrompt().scorerFunction(word);
   console.log(`Score for '${word}': ${score}`);

   // console.log("a is " + newPointStructure.a);

   // const newPointStructure = transform(oldPointStructure);
   // console.log(newPointStructure);

   // console.log(newPointStructure);

   // let word = input.question("Let's play some scrabble! Enter a word: ");
   // console.log(`Score for '${word}' is: ${scrabbleScorer(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
