export const isValidDocumentNumber = (documentType, documentNumber) => {
  if (!documentNumber || documentNumber.trim() === '') return false;

  const isNumeric = /^\d+$/.test(documentNumber);

  if (documentType === 'DNI') {
    return documentNumber.length === 8 && isNumeric;
  } else if (documentType === 'RUC') {
    return documentNumber.length === 11 && isNumeric;
  } else if (documentType === 'CE') {
    return documentNumber.length <= 12;
  } else {
    throw new TypeError(`Tipo de Documento no válido: ${ documentType }`);
  }
}

export const isValidPassword = (password) => {
  if (!password) return false;
  return true
}