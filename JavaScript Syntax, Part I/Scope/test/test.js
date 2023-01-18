console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('light.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const logVisibleLightWaves = () => {
        let lightWaves = _ ;
        let region = _ ; 
      };
    };

    let structureTwo = function() {
      const logVisibleLightWaves = function() {
        let lightWaves = _ ;
        let region = _ ; 
      };
    };
 
    let structureThree = function() {
      function logVisibleLightWaves() {
        let lightWaves = _ ;
        let region = _ ; 
      }
    };

    let isMatchOne = Structured.match(code, structureOne);
    let isMatchTwo = Structured.match(code, structureTwo);
    let isMatchThree = Structured.match(code, structureThree);
    let failureMessage = 'Did you use `let` to create a variable named `region` inside the function block?';
    assert.isOk(isMatchOne || isMatchTwo || isMatchThree, failureMessage);
  });
});


describe('', function () {
  it('', function() {
    let structureOne = function() {
      const logVisibleLightWaves = () => {
        let lightWaves = _ ;
        let region = _ ; 
      };
    };

    let structureTwo = function() {
      const logVisibleLightWaves = function() {
        let lightWaves = _ ;
      };
    };
 
    let structureThree = function() {
      function logVisibleLightWaves() {
        let lightWaves = _ ;
      }
    };

    
    let isMatchOne = Structured.match(code, structureOne);
    let isMatchTwo = Structured.match(code, structureTwo);
    let isMatchThree = Structured.match(code, structureThree);
    let failureMessage = 'Did you set the `region` variable equal to the string \'The Arctic\'?';
    assert.isOk(isMatchOne || isMatchTwo || isMatchThree, failureMessage);
  });
});
