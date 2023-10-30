import { DocumentsTypeEnum, GendersTypeEnum } from "./account.enum";

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
