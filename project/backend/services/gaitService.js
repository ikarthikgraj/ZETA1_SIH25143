// Minimal gait feature extractor (placeholder)
function computeAsymmetry(pressureMatrixLeft, pressureMatrixRight) {
  const sum = arr => arr.flat().reduce((a,b)=>a+(b||0),0);
  const l = sum(pressureMatrixLeft);
  const r = sum(pressureMatrixRight);
  const asym = l + r === 0 ? 0 : Math.abs(l - r) / ((l + r) / 2);
  return asym;
}

module.exports = { computeAsymmetry };
