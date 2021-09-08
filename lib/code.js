const HEAD = 0;

const _concat = (fst, snd) =>
  typeof fst === 'string' ? ''.concat(fst, snd) : [].concat(fst, snd);

const concat = (fst, snd) =>
  snd === undefined ? (_snd) => _concat(fst, _snd) : _concat(fst, snd);

const colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  purple: 35,
  cyan: 36,
  white: 37,
  start: '\x1b[',
  bold: '1;',
  reset: '\x1b[0m',
  background: 10,
  ending: 'm',
};

function makeAnsiStyle(fgColor = '', bgColor = '', formatted = '') {
  const tempFormated = colors[formatted] || '';
  const fg = colors[fgColor]
    ? `${colors.start}${tempFormated}${colors[fgColor]}${colors.ending}`
    : '';
  const tempBg = (colors[bgColor] + 10).toString() || '';
  const bg = colors[bgColor] ? `${colors.start}${tempBg}${colors.ending}` : '';
  return fg + bg;
}

function compose(...fns) {
  return function (val) {
    for (let i = fns.length - 1; i >= 0; i--) {
      val = fns[i](val);
    }
    return val;
  };
}

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

const typeFns = {
  array: (acc, val, key, level) =>
    acc.concat(fmtProp(key, 'array', level, val)),
  object: (acc, val, key, level) =>
    compose(
      concat(fmtProp(key, 'object', level, null)),
      concat(logObj(val, level + 1))
    )(acc),
  boolean: (acc, val, key, level) =>
    acc.concat(fmtProp(key, 'boolean', level, val)),
  null: (acc, val, key, level) => acc.concat(fmtProp(key, 'null', level, val)),
  symbol: (acc, val, key, level) =>
    acc.concat(fmtProp(key, 'symbol', level, val)),
  string: (acc, val, key, level) =>
    acc.concat(fmtProp(key, 'string', level, val)),
  number: (acc, val, key, level) =>
    acc.concat(fmtProp(key, 'string', level, val)),
  Map: (acc, val, key, level) => acc.concat(fmtProp(key, 'Map', level, val)),
  Set: (acc, val, key, level) => acc.concat(fmtProp(key, 'Set', level, val)),
};

function logObj(object, shouldUseColors = true, level = 0) {
  const coloredStr = Object.entries(object).reduce((acc, [key, value]) => {
    return typeFns[whichType(object[key])](acc, value, key, level);
  }, '');
  return shouldUseColors ? coloredStr : purify(coloredStr);
}

const purify = (str) =>
  str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );

const fmtLn = (ln, w) => `║ ${ln}${' '.repeat(w - ln.length)} ║`;

const fmtLns = (arr, w) => arr.map((ln) => fmtLn(ln, w));

const isLonger = (a, b) => b.length - a.length;

const longestLnLenOf = (lns) => [...lns].sort(isLonger)[HEAD].length;

const topLn = (w) => `╔${'═'.repeat(w + 2)}╗\n`;

const bottomLn = (w) => `\n╚${'═'.repeat(w + 2)}╝\n`;

function boxify(str) {
  const lns = str.split('\n') || [str];
  const longestLnLen = longestLnLenOf(lns);
  const formattedLines = fmtLns(lns, longestLnLen).join('\n');
  return compose(
    concat(topLn(longestLnLen)),
    concat(formattedLines)
  )(bottomLn(longestLnLen));
}

const fmtStr = (text, fgColor = '', bgColor = '', formatted = '') => {
  const textStyles = makeAnsiStyle(fgColor, bgColor, formatted);
  return `${colors.reset}${textStyles}${text}${colors.reset}`;
};
