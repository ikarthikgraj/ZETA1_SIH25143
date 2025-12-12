// Simple helper: compute center of pressure (CoP)
function computeCoP(matrix) {
  // matrix: rows x cols numeric
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  let total = 0, xAcc = 0, yAcc = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = matrix[r][c] || 0;
      total += v;
      xAcc += v * c;
      yAcc += v * r;
    }
  }
  if (total === 0) return { x: 0, y: 0 };
  return { x: xAcc / total, y: yAcc / total };
}

module.exports = { computeCoP };
