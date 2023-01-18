console.log = function() {};
var rewire = require('rewire')
const { assert, expect } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const plantNeedsWater = day => day === $day ? true : false;
    };

    let structureTwo = function() {
      const plantNeedsWater = day => day === $day
    };

    varCallbacks = [
      function($day){
        if($day.value !== 'Wednesday'){
          return {failure: 'Did you check if `day === \'Wednesday\'`?'}
        }
        return true
      }
    ]

    let isMatchOne = Structured.match(code, structureOne, { varCallbacks });

    let isMatchTwo = Structured.match(code, structureTwo, { varCallbacks });

    let appModule
    try {
      appModule = rewire('../main.js');
    } catch (e) {
        expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }

    let plantNeedsWater
    try {
      plantNeedsWater = appModule.__get__("plantNeedsWater");
    } catch (e) {
      expect(true, 'Your function should still be called `plantNeedsWater()`').to.equal(false);
    }

    let test1 = plantNeedsWater('Wednesday') === true
    let test2 = plantNeedsWater('Tuesday') === false
    let test3 = plantNeedsWater('') === false
    let scenarios = [test1, test2, test3].every(el => el === true)


    let parensCheck = code.match(/\(\s*day\s*\)/);
    assert.isOk(isMatchOne || (isMatchTwo && scenarios), varCallbacks.failure || 'Did you refactor `plantNeedsWater()` to be a concise body?');
    assert.isNotOk(parensCheck, 'Did you remove the parentheses around `day` parameter?')
  });
});
