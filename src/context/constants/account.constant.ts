import { DocumentsTypeEnum, GendersTypeEnum } from "../enums/account.enum";

export const COUNTRY_CODE = "55";

interface GenderType {
  [key: string]: GendersTypeEnum;
}

export const GENDER_TYPES: GenderType = {
  MALE: GendersTypeEnum.Male,
  FEMALE: GendersTypeEnum.Female,
};

interface DocumentType {
  [key: string]: DocumentsTypeEnum;
}

export const DOCUMENT_TYPES: DocumentType = {
  CPF: DocumentsTypeEnum.CPF,
  CNPJ: DocumentsTypeEnum.CNPJ,
};
