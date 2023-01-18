console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('main.js', 'utf8');

describe('', function () {
  it('', function() {

    let structureOne = function() {
      isLocked ? console.log($locked) : console.log($unlocked)
    };

    varCallbacks = [
      function($locked, $unlocked){
        if($locked.value !== 'You will need a key to open the door.'){
          return {failure: 'Did you `console.log(\'You will need a key to open the door.\')` in the truthy expression?'}
        }
        if($unlocked.value !== 'You will not need a key to open the door.'){
          return {failure: 'Did you `console.log(\'You will not need a key to open the door.\')` in the falsy expression?'}
        }
        return true
      }
    ]

    let isMatchOne = Structured.match(code, structureOne, { varCallbacks });

    assert.isOk(isMatchOne, varCallbacks.failure || 'Did you change the first if/else statement to look like the examples above?');
  });
});
