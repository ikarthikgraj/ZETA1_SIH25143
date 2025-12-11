const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateReport(outputPath, patient, summary) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);
    doc.fontSize(20).text('OrthoSense — Patient Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Patient: ${patient.name || 'Unknown'}`);
    doc.text(`Generated: ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.text('Summary:');
    doc.text(JSON.stringify(summary, null, 2));
    doc.end();
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

module.exports = { generateReport };
