const numericRegex = /[^\d]/g;
export function getOnlyNumberString(value: string): string {
  return value.replace(numericRegex, "");
}
