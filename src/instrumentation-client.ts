// Silence deprecation noise from libraries that still instantiate THREE.Clock
// (react-three-fiber v9 creates one per canvas). THREE itself is unaffected.
const CLOCK_MSG = "This module has been deprecated. Please use THREE.Timer instead.";

const originalError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (args.length > 0 && typeof args[0] === "string" && args[0].includes(CLOCK_MSG)) return;
  originalError(...args);
};

const originalWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (args.length > 0 && typeof args[0] === "string" && args[0].includes(CLOCK_MSG)) return;
  originalWarn(...args);
};
