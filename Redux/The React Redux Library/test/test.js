console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');

describe('', function() {
  it('', function() {
    let appModule;
    try {
        appModule = rewire('../searchSlice.js');
    } catch (e) {
        expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }

    let varLearnerDeclares;
    let learnerVariableName = 'selectSearchTerm';
    try {
        varLearnerDeclares = appModule.__get__(learnerVariableName);
    } catch (e) {
        expect(true, `Did you declare the \`${learnerVariableName}\` selector?`).to.equal(false);
    }

    // These are just two possible examples, you can use the whole Chai expect API
    expect(varLearnerDeclares, `Did you declare \`${learnerVariableName}\` to be a function?`).to.be.a('function');
    expect(varLearnerDeclares({searchTerm: 'Hello'}), 'Did you return the state\'s `searchTerm` value?').to.deep.equal('Hello');
  });
});