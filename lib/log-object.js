const { purify, concat, compose } = require("./helpers");
const { fmtStr } = require("./fmt-str");

const colorsForTypes = {
  array: "white",
  object: "red",
  null: "purple",
  Map: "purple",
  Set: "purple",
  undefined: "purple",
  string: "green",
  number: "yellow",
  boolean: "cyan",
};

function fmtProp(key, type, level, value = "") {
  const prefix = level > 0 ? `${" ".repeat(level * 2)}` : "";
  const valFmt = fmtStr(value, "purple");
  return concat(
    fmtStr(`${prefix}[${key}]: ${valFmt}`, "blue", "bold"),
    fmtStr(` <${type}>\n`, colorsForTypes[type], "bold")
  );
}

function whichType(entity) {
  if (entity === null) return "null";
  if (Array.isArray(entity)) return "array";
  if (entity instanceof Map) return "Map";
  if (entity instanceof Set) return "Set";
  return typeof entity;
}

const typeFns = {
  array: (acc, val, key, level) =>
    acc.concat(fmtProp(key, "array", level, val)),
  object: (acc, val, key, level) =>
    compose(
      concat(fmtProp(key, "object", level)),
      concat(logObj(val, level + 1))
    )(acc),
  boolean: (acc, val, key, level) =>
    acc.concat(fmtProp(key, "boolean", level, val)),
  null: (acc, val, key, level) => acc.concat(fmtProp(key, "null", level, val)),
  symbol: (acc, val, key, level) =>
    acc.concat(fmtProp(key, "symbol", level, val)),
  string: (acc, val, key, level) =>
    acc.concat(fmtProp(key, "string", level, val)),
  number: (acc, val, key, level) =>
    acc.concat(fmtProp(key, "string", level, val)),
  Map: (acc, val, key, level) => acc.concat(fmtProp(key, "Map", level, val)),
  Set: (acc, val, key, level) => acc.concat(fmtProp(key, "Set", level, val)),
};

function logObj(object, level = 0) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    return typeFns[whichType(object[key])](acc, value, key, level);
  }, "");
}

module.exports = { logObj, whichType, fmtProp };
