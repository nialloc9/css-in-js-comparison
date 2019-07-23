'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

// Note: $Shape is needed to make polymorphic withStyle refinements work correctly
// It seems functions satisfy this type without $Shape
// See: https://github.com/facebook/flow/issues/6784
//
//
//
//
//
//
function driver(style, styletron) {
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}
function getInitialStyle() {
  return {};
}
function renderDeclarativeRules(style, styletron) {
  for (const key in style) {
    const val = style[key];

    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes(val);
      continue;
    }

    if (key === "fontFamily" && typeof val !== "string") {
      if (Array.isArray(val)) {
        let result = "";

        for (const font of val) {
          if (typeof font === "object") {
            result += `${styletron.renderFontFace(font)},`;
          } else if (typeof font === "string") {
            result += `${font},`;
          }
        }

        style.fontFamily = result.slice(0, -1);
        continue;
      } else {
        style.fontFamily = styletron.renderFontFace(val);
        continue;
      }
    }

    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules(val, styletron);
    }
  }

  return style;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-env browser */

/* eslint-disable no-unused-vars, no-redeclare, no-shadow */
const noopEngine = {
  renderStyle: () => "",
  renderKeyframes: () => "",
  renderFontFace: () => ""
};
const StyletronContext = React.createContext(noopEngine);
const HydrationContext = React.createContext(false);
const DebugEngineContext = React.createContext();
const ThemeContext = React.createContext();

const Provider = StyletronContext.Provider;
const Consumer = StyletronContext.Consumer;

function checkNoopEngine(engine) {
  // if no engine provided, we default to no-op, handy for tests
  // however, print a warning in other envs
  if (process.env.NODE_ENV !== "test") {
    engine === noopEngine && // eslint-disable-next-line no-console
    console.warn(process.env.NODE_ENV !== "production" ? `
Styletron has been switched to a no-op (test) mode.

A Styletron styled component was rendered, but no Styletron engine instance was provided in React context.

Did you forget to provide a Styletron engine instance to React context via using the Styletron provider component?

Note: Providers and Consumers must come from the exact same React.createContext call to work.
If your app has multiple instances of the "styletron-react" package in your node_module tree,
your Provider may be coming from a different React.createContext call, which means the styled components
will not recieve the provided engine instance. This scenario can arise, for example, when using "npm link".
` : `Styletron Provider is not set up. Defaulting to no-op.`);
  }
}
function createStyled({
  getInitialStyle: getInitialStyle$$1,
  driver: driver$$1,
  wrapper
}) {
  function styled(base, styleArg) {
    if (process.env.NODE_ENV !== "production") {
      if (base.__STYLETRON__) {
        /* eslint-disable no-console */
        console.warn("It appears you are passing a styled component into `styled`.");
        console.warn("For composition with existing styled components, use `withStyle` or `withTransform` instead.");
        /* eslint-enable no-console */
      }
    }

    const baseStyletron = {
      reducers: [],
      base: base,
      driver: driver$$1,
      getInitialStyle: getInitialStyle$$1,
      wrapper
    };

    return createStyledElementComponent(autoComposeShallow(baseStyletron, styleArg));
  }

  return styled;
}
const styled = createStyled({
  getInitialStyle,
  driver,
  wrapper: Component$$1 => Component$$1
});
function autoComposeShallow(styletron, styleArg) {
  if (typeof styleArg === "function") {
    return dynamicComposeShallow(styletron, styleArg);
  }

  return staticComposeShallow(styletron, styleArg);
}
function staticComposeShallow(styletron, style) {
  return composeStatic(styletron, createShallowMergeReducer(style));
}
function dynamicComposeShallow(styletron, styleFn) {
  return composeDynamic(styletron, (style, props) => shallowMerge(style, styleFn(props)));
}
function createShallowMergeReducer(style) {
  return {
    reducer: inputStyle => shallowMerge(inputStyle, style),
    assignmentCommutative: true,
    factory: createShallowMergeReducer,
    style: style
  };
}
function composeStatic(styletron, reducerContainer) {
  if (styletron.reducers.length === 0) {
    const style = reducerContainer.reducer(styletron.getInitialStyle());
    const result = {
      reducers: styletron.reducers,
      base: styletron.base,
      driver: styletron.driver,
      wrapper: styletron.wrapper,
      getInitialStyle: () => style
    };

    return result;
  } else {
    const last = styletron.reducers[0];

    if (last.assignmentCommutative === true && reducerContainer.assignmentCommutative === true) {
      const composed = reducerContainer.reducer(last.style);
      const result = {
        getInitialStyle: styletron.getInitialStyle,
        base: styletron.base,
        driver: styletron.driver,
        wrapper: styletron.wrapper,
        reducers: [last.factory(composed)].concat(styletron.reducers.slice(1))
      };

      return result;
    }

    return composeDynamic(styletron, reducerContainer.reducer);
  }
}
function composeDynamic(styletron, reducer) {
  const composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: styletron.wrapper,
    reducers: [{
      assignmentCommutative: false,
      reducer
    }].concat(styletron.reducers)
  };

  return composed;
}
function createStyledElementComponent(styletron) {
  const {
    reducers,
    base,
    driver: driver$$1,
    wrapper,
    getInitialStyle: getInitialStyle$$1,
    ext
  } = styletron;

  const StyledElement = React.forwardRef((props, ref) => {
    return React.createElement(Consumer, null, (styletron, debugEngine, hydrating) => {
      checkNoopEngine(styletron);
      const elementProps = omitPrefixedKeys(props);
      let style = resolveStyle(getInitialStyle$$1, reducers, props);

      if (props.$style) {
        if (typeof props.$style === "function") {
          style = deepMerge(style, props.$style(props));
        } else {
          style = deepMerge(style, props.$style);
        }
      }

      const styleClassString = driver$$1(style, styletron);
      const Element = props.$as ? props.$as : base;
      elementProps.className = props.className ? `${props.className} ${styleClassString}` : styleClassString;

      if (props.$ref) {
        // eslint-disable-next-line no-console
        console.warn("The prop `$ref` has been deprecated. Use `ref` instead. Refs are now forwarded with React.forwardRef.");
      }

      return React.createElement(Element, _extends({}, elementProps, {
        ref: ref || props.$ref
      }));
    });
  });
  const Wrapped = wrapper(StyledElement);
  Wrapped.__STYLETRON__ = {
    base,
    reducers,
    driver: driver$$1,
    wrapper,
    getInitialStyle: getInitialStyle$$1
  };

  if (process.env.NODE_ENV !== "production") {
    let displayName;

    if (typeof base === "string") {
      displayName = base;
    } else if (base.displayName) {
      displayName = base.displayName;
    } else if (base.name) {
      displayName = base.name;
    } else {
      displayName = "Unknown";
    }

    Wrapped.displayName = `Styled(${displayName})`;
  }

  return Wrapped;
} // Utility functions

function resolveStyle(getInitialStyle$$1, reducers, props) {
  let result = getInitialStyle$$1();
  let i = reducers.length;

  while (i--) {
    // Cast to allow passing unused props param in case of static reducer
    const reducer = reducers[i].reducer;
    result = reducer(result, props);
  }

  return result;
}

function isObject(x) {
  return typeof x === "object" && x !== null;
}

function omitPrefixedKeys(source) {
  const result = {};

  for (const key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }

  return result;
}

function deepMerge(a, b) {
  const result = assign({}, a);

  for (const key in b) {
    const val = b[key];

    if (isObject(val) && isObject(a[key])) {
      result[key] = deepMerge(a[key], val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

function shallowMerge(a, b) {
  return assign(assign({}, a), b);
}

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }

  return target;
}

var Button = styled("a", function (_ref) {
  var primary = _ref.primary;
  return primary ? {
    background: "white",
    color: "palevioletred"
  } : {};
});
var Styletron = (function () {
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

module.exports = Styletron;
