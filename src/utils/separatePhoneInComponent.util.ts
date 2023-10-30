interface SeparatePhoneInComponentResult {
  countryCode: "55";
  ddd: string;
  number: string;
}

export const separatePhoneInComponent = (
  text: string
): SeparatePhoneInComponentResult => {
  // Remove todos os caracteres não numéricos
  const cleanedText = text.replace(/\D/g, "");

  // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
  const ddd = cleanedText.replace(/^(\d{2})$/, "$1");
  const number = cleanedText.replace(/^(\d{2})(\d{4})(\d{4})$/, "$2$3");

  return {
    countryCode: "55",
    ddd,
    number,
  };
};
