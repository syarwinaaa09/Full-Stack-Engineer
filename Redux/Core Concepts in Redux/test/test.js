console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');
const fs = require('fs');
const sinon = require('sinon');

describe('', function() {
  // Spy on console.log before learner code runs
  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
		sinon.restore();
  });
  
  it('', function() {    
    let appModule;
    try {
        appModule = rewire('../pure.js');
    } catch (e) {
        expect(true, 'Try checking your code again. You likely have a syntax error: ' + e).to.equal(false);
    }
    
    let varLearnerDeclares;
    let learnerVariableName = 'capitalizeMessage';
    try {
        varLearnerDeclares = appModule.__get__(learnerVariableName);
    } catch (e) {
        expect(true, `Did you declare a \`${learnerVariableName}\` variable or function?`).to.equal(false);
    }
    
    expect(
      varLearnerDeclares, 
      `Make sure that \`${learnerVariableName}\` is a function.`
    ).to.be.a('function');
        
    // Check that readFile is NOT within function
    const regex = /readFile/;
    const functionCode = varLearnerDeclares.toString();
    const functionMatch = functionCode.match(regex);
    expect(
      functionMatch, 
      `Don't use \`readFileSync\` in your \`${learnerVariableName}\` function.`
    ).to.be.null;
    
    // Check that readFile is outside of function
    const fullCode = fs.readFileSync('./pure.js', 'utf8');
    const fullCodeMatch = fullCode.match(regex);
    expect(
      fullCodeMatch,
      `Use \`readFileSync\` module outside of your \`${learnerVariableName}\` function.`
    ).to.not.be.null
    
    // Test function behavior
    const input = 'just some text';
		const expectedOutput = input.toUpperCase();
    const output = varLearnerDeclares(input);
    const outputMatch = output === expectedOutput;
    
    expect(
      outputMatch, 
      `\`${learnerVariableName}\` should return a capitalized version of its argument.`
    ).to.be.true;
      
    // Check that capitalized file contents are actually logged to console
    expect(
      console.log.callCount,
    	`Make sure to call \`console.log\` at least once in your code.`  
    ).to.be.at.least(1);
    
    const fileContents = fs.readFileSync('./data.txt', 'utf8');
    const argsMatch = console.log.calledWith(fileContents.toUpperCase());
    
    expect(
      argsMatch,
    	`The string \`${fileContents.toUpperCase()}\` should be logged to the console.`
    ).to.be.true;
  });
});