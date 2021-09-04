const { compose, concat } = require("../lib/helpers");

describe("#concat", () => {
  it("string", () =>
    expect(concat("hello, ", "world")).toEqual("hello, world"));
  it("array", () => expect(concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]));
});

describe("#compose", () => {
  const inc = (x) => x + 1;
  const addExplamationMark = (str) => `${str}!`;
  const filter = (pred) => (li) =>
    li.reduce((acc, v) => (pred(v) ? acc.concat(v) : acc), []);
  const isEven = (x) => x % 2 === 0;
  const not = (x) => !x;
  const no123 = (x) => not(x > 0 && x < 4);
  it("num", () => expect(compose(inc, inc)(1)).toEqual(3));
  it("string", () =>
    expect(compose(addExplamationMark, addExplamationMark)("Hi!")).toEqual(
      "Hi!!!"
    ));
  it("array", () =>
    expect(
      compose(filter(isEven), filter(no123))([1, 2, 3, 4, 5, 6, 7, 8])
    ).toEqual([4, 6, 8]));
});
