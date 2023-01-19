console.log = function() {};
const { assert } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const target = numberClusters[2][1]
    };

    let isMatchOne = Structured.match(code, structureOne);

    assert.isOk(isMatchOne, 'Did you declare a `const` variable `target` and assign to it `numberClusters`\'s nested element of `6`? Remember to use bracket notation.')
  });
});
