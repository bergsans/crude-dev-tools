const { purify, concat, compose } = require('./helpers');
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

function fmtProp(key, type, level, value = '') {
  const prefix = level > 0 ? `${' '.repeat(level * 2)}` : '';
  const valFmt = fmtStr(value, 'purple');
  return concat(
    fmtStr(`${prefix}[${key}]: ${valFmt}`, 'blue', 'bold'),
    fmtStr(` <${type}>\n`, colorsForTypes[type], 'bold')
  );
}

function whichType(entity) {
  if (entity === null) return 'null';
  if (Array.isArray(entity)) return 'array';
  if (entity instanceof Map) return 'Map';
  if (entity instanceof Set) return 'Set';
  return typeof entity;
}

function fmtObj(valType, shouldUseColors, acc, val, key, level) {
  return valType === 'object'
    ? compose(
        concat(fmtProp(key, 'object', level, null)),
        concat(logObj(val, shouldUseColors, level + 1))
      )(acc)
    : acc.concat(fmtProp(key, valType, level, val));
}

function logObj(object, shouldUseColors = true, level = 0) {
  const coloredStr = Object.entries(object).reduce((acc, [key, value]) => {
    return fmtObj(
      whichType(object[key]),
      shouldUseColors,
      acc,
      value,
      key,
      level
    );
  }, '');
  return shouldUseColors ? coloredStr : purify(coloredStr);
}

module.exports = { logObj, whichType, fmtProp };
