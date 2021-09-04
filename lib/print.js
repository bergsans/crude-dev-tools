const { makeAnsiStyle, colors } = require("./make-ansi-style.js");

const fmtStr = (text, fgColor, bgColor = "", formatted = "") => {
  const textStyles = makeAnsiStyle(fgColor, bgColor, formatted);
  return `${colors.reset}${textStyles}${text}${colors.reset}`;
};

function print(text) {
  if (typeof text === "string") {
    process.stdout.write(text);
  } else if (Array.isArray(text)) {
    text.forEach((ln) => process.stdout.write(ln));
  } else {
    throw new Error(`Invalid type: ${typeof text}`);
  }
}

module.exports = { print, fmtStr };
