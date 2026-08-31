const { TextDecoder, TextEncoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.IS_REACT_ACT_ENVIRONMENT = true;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
