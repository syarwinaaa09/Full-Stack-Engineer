var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
  describe('.factorial', () => {
    it('returns correct value of 5!', () => {

      // Setup 
      const inputNumber = 5;
      const expectedResult = 120;

      // Exercise
      const result = Calculate.factorial(inputNumber);

      // Verify
      assert.equal(result, expectedResult);
    });
    it('returns correct value of 3!', () => {

      // Setup 
      const inputNumber = 3;
      const expectedResult = 6;

      // Exercise
      const result = Calculate.factorial(inputNumber);

      // Verify
      assert.equal(result, expectedResult);
    });

    it('returns correct value of 0!', () => {

      // Setup 
      const inputNumber = 0;
      const expectedResult = 1;

      // Exercise
      const result = Calculate.factorial(inputNumber);

      // Verify
      assert.equal(result, expectedResult);
      
    });
  });
});

