/**
 * Conveierte un archivo a base64
 * @param {File} file
 * @returns {Promise<string>} - Una promesa que resuelve con el archivo convertido a base64.
 */
export const convertToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(new Error(error));
  });
};

/**
 * Convierte un html a PDF y lo descarga
 * @param {String} pdfId - El ID del elemento HTML que se convertirá a PDF.
 * @param {String} pdfName - El nombre del archivo PDF que se descargará.
 * @param {String} unit - La unidad de medida. Puede ser 'px', 'pt', 'mm', 'cm'. Por defecto es 'px'.
 * @param {String} orientation - La orientación del papel. Puede ser 'p' (portrait) o 'l' (landscape). Por defecto es 'p'.
 * @param {*} paperSize - El tamaño del papel. Puede ser 'a4', 'ledger', 'legal'. O se puede especificar el tamaño personalizado [ancho, alto]. Por defecto es 'a4'.
 * @returns {Boolean} - `true` si se descargó el PDF correctamente, de lo contrario, `false`.
 */
export const downloadPdf = (
  pdfId,
  pdfName,
  unit = 'px',
  orientation = 'p',
  paperSize = 'a4',
  margin = [30, 0, 0, 28]
) => {
  try {
    const pdf = document.getElementById(pdfId);
    if (!pdf) {
      console.error(`No se encontró el elemento con ID: ${pdfId}`);
      return false;
    }

    const pdfClone = pdf.cloneNode(true);
    pdfClone.classList.remove('hide');

    // Descargar el PDF
    window.jsPDF = window.jspdf.jsPDF;
    const { AcroFormTextField } = window.jspdf;
    const doc = new jsPDF({
      orientation,
      unit,
      format: paperSize,
    });

    // Añadir los elementos HTML al documento
    doc.html(pdfClone, {
      callback(doc) {
        const inputs = pdfClone.querySelectorAll('input');
        inputs.forEach(input => {
          const x = parseInt(input.getAttribute('x'), 10);
          const y = parseInt(input.getAttribute('y'), 10);
          const width = parseInt(input.getAttribute('pdf-width'), 10);
          const height = parseInt(input.getAttribute('pdf-height'), 10);

          const field = new AcroFormTextField();
          field.x = x;
          field.y = y;
          field.width = width;
          field.height = height;
          doc.addField(field);
        });

        doc.save(pdfName);
      },
      x: 0,
      y: 0,
      margin
    });

    return true;
  } catch (error) {
    console.error(`Error al generar el PDF: ${error.message}`);
    return false;
  }
};
