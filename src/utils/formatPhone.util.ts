export const formatPhone = (text: string): string => {
  const cleanedText = text.replace(/\D/g, "");

  const formattedText = cleanedText.replace(
    /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
    "($1) $2 $3-$4"
  );

  return formattedText;
};
