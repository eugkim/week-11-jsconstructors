// The Letter constructor displays either an underscore or character 

function Letter(char) {
  // If a character is not a number or a letter, make it visible right away
  this.visible = !/[a-z1-9]/i.test(char);
  // Save the underlying character
  this.char = char;
}

// prototypes are optional

// return character if this visible is true or letter
Letter.prototype.toString = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};

Letter.prototype.getSolution = function() {
  return this.char;
};

// Accepts user's guess
Letter.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }

  // otherwise return false
  return false;
};

module.exports = Letter;
