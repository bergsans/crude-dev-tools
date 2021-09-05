const { boxify } = require("../lib/boxify");

describe("#boxify", () => {
  it("Returns text in box", () => {
    const str = `
Hello world!
This is a box.
    `;
    const result = boxify(str.split("\n"));
    const expectedResult = `╔════════════════╗
║                ║
║ Hello world!   ║
║ This is a box. ║
║                ║
╚════════════════╝
`;
    expect(result).toEqual(expectedResult);
  });
});
