var inquirer = require("inquirer");
var Word = require("./Word");
var words = require("./words");

// The Game constructor keeps score and controls the flow of game

function Game() {
  // avoid using self. this will change in inquirer
  var self = this;

  // limit 10 guesses and get next word 
  this.play = function() {
    this.remaining = 10;
    this.nextWord();
  };

  // Creates next Word object using random word from array. prompts user for guess
  this.nextWord = function() {
    var randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.log('\n' + this.currentWord + '\n');
    this.guess();
  };

  // inquirer prompts user for guess
  this.guess = function() {
    this.promptLetter().then(function() {
      // if no guesses remain, show correct word. play again prompt
      if (self.remaining < 1) {
        console.log(
          "Sorry, no guesses remain! The word was: \"" + self.currentWord.getSolution() + "\"\n"
        );
        self.playAgain();

        // if guessed entire word correctly then reset remaining guesses to 10
      }
      else if (self.currentWord.guessedCorrectly()) {
        console.log("You guessed the word! On to the next one!");
        self.remaining = 10;
        self.nextWord();

        // else prompt next guess
      }
      else {
        self.guess();
      }
    });
  };

  // play againg prompt 
  this.playAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        }
      ])
      .then(function(val) {
        // if yes then play again else exit
        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };

  // prompt for letter
  this.promptLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            // guess a number or letter
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        // log correct guess
        var guessCorrect = self.currentWord.guessLetter(val.choice);
        if (guessCorrect) {
          console.log("\nCORRECT!\n");

          // Otherwise decrement `remaining`, and let the user know how many guesses they have left
        }
        else {
          self.remaining--;
          console.log("\nINCORRECT!\n");
          console.log(self.remaining + " guesses remaining!\n");
        }
      });
  };

  // Logs goodbye and exits the node app
  this.quit = function() {
    console.log("\Thanks for playing!");
    process.exit(0);
  };
}

module.exports = Game;
