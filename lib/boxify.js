const { concat, compose } = require("../lib/helpers");

const HEAD = 0;
const fmtLn = (ln, w) => `║ ${ln}${" ".repeat(w - ln.length)} ║`;
const fmtLns = (arr, w) => arr.map((ln) => fmtLn(ln, w));
const isLonger = (a, b) => b.length - a.length;
const longestLnLenOf = (lns) => [...lns].sort(isLonger)[HEAD].length;
const topLn = (w) => `╔${"═".repeat(w + 2)}╗\n`;
const bottomLn = (w) => `\n╚${"═".repeat(w + 2)}╝\n`;

function boxify(lns) {
  const longestLn = longestLnLenOf(lns);
  const formattedLines = fmtLns(lns, longestLn);
  return compose(
    concat(topLn(longestLn)),
    concat(formattedLines.join("\n"))
  )(bottomLn(longestLn));
}

module.exports = { boxify };
