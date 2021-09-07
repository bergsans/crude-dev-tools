const HEAD = 0;

const _concat = (fst, snd) =>
  typeof fst === 'string' ? ''.concat(fst, snd) : [].concat(fst, snd);

const concat = (fst, snd) =>
  snd === undefined ? (_snd) => _concat(fst, _snd) : _concat(fst, snd);

const purify = (str) =>
  str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );

function compose(...fns) {
  return function (val) {
    for (let i = fns.length - 1; i >= 0; i--) {
      val = fns[i](val);
    }
    return val;
  };
}

module.exports = { HEAD, concat, compose, purify };
