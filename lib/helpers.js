const _concat = (fst, snd) =>
  typeof fst === "string" ? "".concat(fst, snd) : [].concat(fst, snd);

const concat = (fst, snd) =>
  snd === undefined ? (_snd) => _concat(fst, _snd) : _concat(fst, snd);

function compose(...fns) {
  return function (val) {
    for (let i = fns.length - 1; i >= 0; i--) {
      val = fns[i](val);
    }
    return val;
  };
}

module.exports = { concat, compose };
