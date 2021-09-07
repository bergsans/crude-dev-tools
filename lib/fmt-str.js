const { makeAnsiStyle, colors } = require('./make-ansi-style.js');

const fmtStr = (text, fgColor = '', bgColor = '', formatted = '') => {
  const textStyles = makeAnsiStyle(fgColor, bgColor, formatted);
  return `${colors.reset}${textStyles}${text}${colors.reset}`;
};

module.exports = { fmtStr };
