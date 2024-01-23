import { UserTypesUser } from "../../services/api/sign-in/get-types.service";
import { UserTypesDto } from "./dtos/sign-in.dto";

export const getUserTypesInitialValue: UserTypesDto = {
  id: "",
  name: "",
  lastName: "",
  document: "",
  documentType: "",
  email: "",
  gender: "",
  details: null,
  birthDate: 0,
  active: false,
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
  userTypesUsers: [] as UserTypesUser[],
};
