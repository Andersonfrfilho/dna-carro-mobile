export const formatBirthDate = (text: string): string => {
  // Remove todos os caracteres não numéricos
  const cleanedText = text.replace(/\D/g, "");

  // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
  const formattedText = cleanedText.replace(
    /^(\d{2})(\d{2})(\d{4})$/,
    "$1/$2/$3"
  );

  return formattedText;
};
