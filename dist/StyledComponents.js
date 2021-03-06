'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Styled = _interopDefault(require('styled-components'));

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Button = Styled.a(_templateObject(), function (_ref) {
  var primary = _ref.primary;
  return primary && "\n    background: white;\n    color: palevioletred;\n  ";
});
var StyledComponents = (function () {
  return React__default.createElement(React.Fragment, null, React__default.createElement(Button, {
    href: "https://github.com/styled-components/styled-components",
    target: "_blank",
    rel: "noopener",
    primary: true
  }, "GitHub"), React__default.createElement(Button, {
    href: "/docs",
    prefetch: true
  }, "Documentation"));
});

module.exports = StyledComponents;
