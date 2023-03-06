let shallow = require('enzyme/shallow'),
  appModule = require('../app'),
  components = appModule.__ReactComponents,
  TestedComponent = components[0];

describe('', function () {
  it('', function () {
    let wrapper = shallow(<TestedComponent />);
    expect(
      'onClick' in wrapper.props(),
      'The `<button></button>` should have an `onClick` attribute.'
    ).to.equal(true);
    expect(
      wrapper.props().onClick,
      '`onClick` should be equal to `{this.scream}`.'
    ).to.eql(wrapper.instance().scream);
  });
});
