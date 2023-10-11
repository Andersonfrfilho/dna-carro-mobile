export function validateCNPJ(value: string): boolean {
  const cleanValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (cleanValue.length !== 14) {
    return false; // CNPJ tem 14 dígitos
  }

  let size = cleanValue.length - 2;
  let numbers = cleanValue.substring(0, size);
  const digits = cleanValue.substring(size);

  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  size++;
  numbers = cleanValue.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return result === parseInt(digits.charAt(1));
}
