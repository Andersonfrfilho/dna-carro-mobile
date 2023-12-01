export const CPF_KEY = "CPF";
export const CNPJ_KEY = "CNPJ";
export const DOCUMENT_TYPES = {
  [CPF_KEY]: "cpf",
  [CNPJ_KEY]: "cnpj",
};

export const MALE_KEY = "MALE";
export const FEMALE_KEY = "FEMALE";

export const GENDER_TYPES = {
  [MALE_KEY]: "male",
  [FEMALE_KEY]: "female",
};

export const GENDER_ITEMS_TYPE = [
  {
    id: GENDER_TYPES.FEMALE,
    value: FEMALE_KEY,
    label: "feminino",
  },
  {
    id: GENDER_TYPES.MALE,
    value: MALE_KEY,
    label: "masculino",
  },
];
