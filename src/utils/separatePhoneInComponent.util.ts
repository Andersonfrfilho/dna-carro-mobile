interface SeparatePhoneInComponentResult {
  countryCode: string;
  ddd: string;
  number: string;
}

export const separatePhoneInComponent = (
  text: string
): SeparatePhoneInComponentResult => {
  const cleanedText = text.replace(/\D/g, "");
  const INDEX_COUNTRY_CODE = 0;
  const LENGTH_COUNTRY_CODE = 2;
  const countryCode = cleanedText.substring(
    INDEX_COUNTRY_CODE,
    LENGTH_COUNTRY_CODE
  );
  const INDEX_DDD = 2;
  const LENGTH_DDD = 4;
  const ddd = cleanedText.substring(INDEX_DDD, LENGTH_DDD);
  const INDEX_NUMBER = 4;
  const LENGTH_NUMBER = cleanedText.length;
  const number = cleanedText.substring(INDEX_NUMBER, LENGTH_NUMBER);

  return {
    countryCode,
    ddd,
    number,
  };
};
