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

export const EMAIL_KEY = "EMAIL";
export const PHONE_KEY = "PHONE";
export const ACCOUNT_USER_TYPES = {
  [CPF_KEY]: "cpf",
  [CNPJ_KEY]: "cnpj",
  [EMAIL_KEY]: "email",
  [PHONE_KEY]: "phone",
};

export const ACCOUNT_USER_TYPES_LENGTH = {
  [CPF_KEY]: 11,
  [CNPJ_KEY]: 14,
  [PHONE_KEY]: 11,
};
export const PASSWORD_MINIMAL_LENGTH = 6;
