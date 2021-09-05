# CrudeDevTools

CrudeDevTools is a minimalistic interface library for console applications. It contains

- A figlet wrapper
- A boxifyer
- A text formatter (*allows colors, bold)
- A object pretty-printer

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


## A object pretty-printer
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
```

## A figlet wrapper
![screenshot: figlet wrapper](https://raw.githubusercontent.com/bergsans/crude-dev-tools/main/assets/ascii-print-example.png)
```
// wrapper for figlet-promises
// supports: 3-d,3x5,5lineoblique,acrobatic,alligator,
// alligator2,alphabet,avatar,banner,banner3-D,banner3,
// banner4,barbwire,basic,bell,big,bigchief,binary,
// block,bubble,bulbhead,calgphy2,caligraphy,catwalk,
// chunky,coinstak,colossal,computer,contessa,contrast,
// cosmic,cosmike,cricket,cursive,cyberlarge,cybermedium,
// cybersmall,diamond,digital,doh,doom,dotmatrix,
// drpepper,eftichess,eftifont,eftipiti,eftirobot,
// eftitalic,eftiwall,eftiwater,epic,fender,fourtops,
// fuzzy,goofy,gothic,graffiti,hollywood,invita,isometric1,
// isometric2,isometric3,isometric4,italic,ivrit,jazmine,
// jerusalem,katakana,kban,larry3d,lcd,lean,letters,linux,
// lockergnome,madrid,marquee,maxfour,mike,mini,mirror,
// mnemonic,morse,moscow,nancyj-fancy,nancyj-underlined,
// nancyj,nipples,ntgreek,o8,ogre,pawp,peaks,pebbles,pepper,
// poison,puffy,pyramid,relief,relief2,rev,roman,rot13,
// rounded,rowancap,rozzo,runic,runyc,sblood,script,
// serifcap,shadow,short,slant,slide,slscript,small,
// smisome1,smkeyboard,smscript,smshadow,smslant,smtengwar,
// speed,stampatello,standard,starwars,stellar,stop,
// straight,tanja,tengwar,term,thick,thin,threepoint,
// ticks,ticksslant,tinker-toy,tombstone,trek,tsalagi,
// twopoint,univers,usaflag,wavy,weird

const { figletFmtStr, fmtStr } = require("crude-dev-tools");

figletFmtStr("crude", "kban")
  .then((res) => fmtStr(res, "blue"))
  .then(console.log);
```
