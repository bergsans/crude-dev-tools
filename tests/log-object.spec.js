const { purify } = require("../lib/helpers");
const { whichType, fmtProp } = require("../lib/log-object");

describe("#whichType", () => {
  it("array", () => expect(whichType([1, 2, 3])).toEqual("array"));
  it("object", () => expect(whichType({ a: 1 })).toEqual("object"));
  it("null", () => expect(whichType(null)).toEqual("null"));
  it("Map", () => expect(whichType(new Map())).toEqual("Map"));
  it("Set", () => expect(whichType(new Set())).toEqual("Set"));
  it("undefined", () => expect(whichType(undefined)).toEqual("undefined"));
  it("string", () => expect(whichType("hi")).toEqual("string"));
  it("number", () => expect(whichType(3)).toEqual("number"));
  it("boolean", () => expect(whichType(false)).toEqual("boolean"));
});

describe("#fmtProp", () => {
  it("Should return formatted string representation of prop", () => {
    const result = purify(fmtProp("a", "string", 2, "hello"));
    expect(result.trim()).toEqual("[a]: hello <string>");
    const result2 = purify(fmtProp("a", "object", 2));
    expect(result2.trim()).toEqual("[a]:  <object>");
  });
});
