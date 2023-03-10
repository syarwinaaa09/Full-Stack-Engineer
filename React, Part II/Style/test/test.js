let shallow = require('enzyme/shallow'),
  rewire = require('rewire'),
  appModule = rewire('../AttentionGrabber'),
  components = appModule.__ReactComponents,
  TestedComponent = components[0];

describe('', function () {
  it('', function () {
    let wrapper = shallow(<TestedComponent />),
      h1Style = appModule.__get__('h1Style');
    expect(
      wrapper.props().style,
      'In **AttentionGrabber.js**, make sure that the `<h1>` has an attribute of `style={h1Style}`.'
    ).to.eql(h1Style);
  });
});
