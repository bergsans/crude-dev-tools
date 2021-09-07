const { concat, compose } = require('./helpers');
const { fmtStr } = require('./fmt-str');

const colorsForTypes = {
  array: 'white',
  object: 'red',
  null: 'purple',
  Map: 'purple',
  Set: 'purple',
  undefined: 'purple',
  string: 'green',
  number: 'yellow',
  boolean: 'cyan',
};

function fmtProp(key, type, level, value = '', color) {
  const prefix = level > 0 ? `${' '.repeat(level * 2)}` : '';
  const valFmt = color ? fmtStr(value, 'purple') : value;
  return color
    ? concat(
        fmtStr(`${prefix}[${key}]: ${valFmt}`, 'blue', 'bold'),
        fmtStr(` <${type}>\n`, colorsForTypes[type], 'bold')
      )
    : concat(`${prefix}[${key}]: ${valFmt}`, ` <${type}>\n`);
}

function whichType(entity) {
  if (entity === null) return 'null';
  if (Array.isArray(entity)) return 'array';
  if (entity instanceof Map) return 'Map';
  if (entity instanceof Set) return 'Set';
  return typeof entity;
}

const typeFns = {
  array: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'array', level, val, color)),
  object: (acc, val, key, level, color) =>
    compose(
      concat(fmtProp(key, 'object', level, color)),
      concat(logObj(val, level + 1))
    )(acc),
  boolean: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'boolean', level, val, color)),
  null: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'null', level, val, color)),
  symbol: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'symbol', level, val, color)),
  string: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'string', level, val, color)),
  number: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'string', level, val, color)),
  Map: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'Map', level, val, color)),
  Set: (acc, val, key, level, color) =>
    acc.concat(fmtProp(key, 'Set', level, val, color)),
};

function logObj(object, color = true, level = 0) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    return typeFns[whichType(object[key])](acc, value, key, level, color);
  }, '');
}

module.exports = { logObj, whichType, fmtProp };
