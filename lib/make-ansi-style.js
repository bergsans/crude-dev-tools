const colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  purple: 35,
  cyan: 36,
  white: 37,
  start: "\x1b[",
  bold: "1;",
  reset: "\x1b[0m",
  background: 10,
  ending: "m",
};

function makeAnsiStyle(fgColor = "", bgColor = "", formatted = "") {
  const tempFormated = colors[formatted] || "";
  const fg = colors[fgColor]
    ? `${colors.start}${tempFormated}${colors[fgColor]}${colors.ending}`
    : "";
  const tempBg = (colors[bgColor] + 10).toString() || "";
  const bg = colors[bgColor] ? `${colors.start}${tempBg}${colors.ending}` : "";
  return fg + bg;
}

module.exports = { makeAnsiStyle, colors };
