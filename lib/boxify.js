const { concat, compose } = require("../lib/helpers");

const fmtLn = (ln, w) => `║ ${ln}${" ".repeat(w - ln.length)} ║`;

const fmtLns = (arr, w) => arr.map((ln) => fmtLn(ln, w));

const isLonger = (a, b) => b.length - a.length;

const HEAD = 0;

const longestLnLenOf = (lns) => [...lns].sort(isLonger)[HEAD].length;

const topLn = (w) => `╔${"═".repeat(w + 2)}╗\n`;

const bottomLn = (w) => `\n╚${"═".repeat(w + 2)}╝\n`;

function boxify(str) {
  const lns = str.split("\n") || [str];
  const longestLnLen = longestLnLenOf(lns);
  const formattedLines = fmtLns(lns, longestLnLen).join("\n");
  return compose(
    concat(topLn(longestLnLen)),
    concat(formattedLines)
  )(bottomLn(longestLnLen));
}

module.exports = { boxify };
