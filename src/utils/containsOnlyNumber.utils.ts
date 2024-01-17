const numericRegex = /^\d+$/;
export function containsOnlyNumber(value: string) {
  /**regex to identifier all character is numbers and implement the test*/

  return numericRegex.test(value);
}
