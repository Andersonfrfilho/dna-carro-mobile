export const formatCPF = (text: string): string => {
  // Remove todos os caracteres não numéricos
  const cleanedText = text.replace(/\D/g, "");

  // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
  const formattedText = cleanedText.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );

  return formattedText;
};
