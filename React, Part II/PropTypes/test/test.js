const fs = require('fs');
const shallow = require('enzyme/shallow');
const rewire = require('rewire');

describe('', function () {
  it("", function () {
    
    let appModule;
    let sourceCode;
    try {
        appModule = rewire('../components/GuineaPigs.js');
        sourceCode = fs.readFileSync('components/GuineaPigs.js', 'utf8');
    } catch (e) {
        expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }
    
		const TestedComponent = appModule.__get__('GuineaPigs');    
    let pT = TestedComponent.propTypes;
    
    expect(
      pT, 
      "GuineaPigs should have a property with a name of `propTypes`."
    ).to.exist;
    
    expect(
      typeof pT,
      'GuineaPigs should have a property with a name of `propTypes` and a value of an object.'
    ).to.equal('object');

    expect(
      pT && pT.src,
      'GuineaPigs\'s `propTypes` object should have a property of `src` assigned to a prop type.'
    ).to.be.a('function');
    
    let regexp = /PropTypes\.string\.isRequired/;
    let usesCorrectType = regexp.test(sourceCode);
    
    expect(
      usesCorrectType,
      'Make sure to use the `PropTypes.string.isRequired` constraint in your `propTypes` object.'
    ).to.equal(true);
  });
}); 