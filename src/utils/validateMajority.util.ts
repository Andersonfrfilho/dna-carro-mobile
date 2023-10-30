import moment from "moment";
import { MAJORITY } from "./constant.utils";

export function validateMajority(data: string): boolean {
  // Tente criar um objeto Moment com a data fornecida e formatá-lo como "DD/MM/YYYY"
  const eightTeenYearAgo = moment(new Date()).subtract(MAJORITY, "years");

  return moment(data, "DD/MM/YYYY", true).isBefore(eightTeenYearAgo); // O "true" indica que deve ser estrito na validação
}
