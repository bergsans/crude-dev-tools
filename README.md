![logo](https://raw.githubusercontent.com/bergsans/crude-dev-tools/main/assets/logo.png)

CrudeDevTools is a minimalistic interface library for console applications. It contains

- A boxifyer
- A text ANSI formatter (*colors, bold)
- An ANSI purifier
- An object pretty-printer

## Setup
```
$ npm install crude-dev-tools
```

## A boxifyer
![screenshot: boxifier](https://raw.githubusercontent.com/bergsans/crude-dev-tools/main/assets/boxify-example.png)

```
const { boxify, fmtStr } = require("crude-dev-tools");

const str = `
Hello world!
This is a box.
    `;

// un-colored
console.log(boxify(str));

// blue colored
console.log(fmtStr(boxify(str), "blue"));
```


## An object pretty-printer
![screenshot: object pretty-printer](https://raw.githubusercontent.com/bergsans/crude-dev-tools/main/assets/lob-obj-example.png)

```
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

// without colors: console.log(logObj, false));
```

