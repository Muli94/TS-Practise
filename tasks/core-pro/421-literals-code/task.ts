type BinaryDigit = 0 | 1
type BinaryNumber = `${BinaryDigit}${BinaryDigit}${BinaryDigit}`;
type BinaryString = `${BinaryNumber}-${BinaryNumber}-${BinaryNumber}`;

export type Code = BinaryString;

export function codeToDecimal(code: Code) {
  const parts = code.split('-');

  if (parts.length !== 3 || parts.some(elem => elem.length !== 3)) {
    throw new Error('Invalid code format');
  }

  return parts.map((elem) => parseInt(elem, 2).toString()).join('');
}
