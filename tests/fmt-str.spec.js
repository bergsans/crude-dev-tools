const { purify } = require("../lib/helpers");
const { fmtStr } = require("../lib/fmt-str");

describe("#fmtStr", () => {
  it("Should not add ansi codes to string", () =>
    expect(purify(fmtStr("hello"))).toEqual("hello"));
  it("Should add ansi codes to string", () => {
    const result = fmtStr("hello", "blue");
    expect(result.includes("\x1b[0m")).toEqual(true);
  });
});
