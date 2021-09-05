const Figlet = require("figlet-promises");
const figlet = new Figlet();

async function figletFmtStr(text, font = "standard") {
  await figlet.loadFonts();
  const data = await figlet.write(text, font);
  return data;
}

module.exports = { figletFmtStr };
