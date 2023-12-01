export function validatePhone(value: string): boolean {
  const DIGIT_NINE_PHONE = "9";
  const thirdCharacter = value.substring(2, 3);
  return thirdCharacter === DIGIT_NINE_PHONE;
}
