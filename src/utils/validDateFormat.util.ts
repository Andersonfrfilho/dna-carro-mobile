import moment from "moment";

export function validateDateFormatBR(data: string): boolean {
  // Tente criar um objeto Moment com a data fornecida e formatá-lo como "DD/MM/YYYY"
  const dataFormatada = moment(data, "DD/MM/YYYY", true); // O "true" indica que deve ser estrito na validação

  // Verifique se a data formatada corresponde à data de entrada
  return dataFormatada.format("DD/MM/YYYY") === data;
}
