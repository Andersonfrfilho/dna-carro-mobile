export const formatCNPJ = (text: string): string => {
  // Remove todos os caracteres não numéricos
  const cleanedText = text.replace(/\D/g, "");

  // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
  const formattedText = cleanedText.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );

  return formattedText;
};
