const { logObj } = require("crude-dev-tools");

const obj = {
  a: {
    b: 123,
    c: "Hello, world!",
    d: [1, 2, 3],
    e: {
      f: true,
    },
  },
};
console.log(logObj(obj));
