const { boxify, fmtStr } = require("crude-dev-tools");

const str = `
Hello world!
This is a box.
    `;

// un-colored
console.log(boxify(str));

// blue colored
console.log(fmtStr(boxify(str), "blue"));
