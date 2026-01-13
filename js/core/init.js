export function initModule(module) {
  if (module && typeof module.init === "function") {
    return module.init();
  }
  return Promise.resolve();
}
