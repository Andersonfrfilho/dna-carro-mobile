import moment from "moment";
import { FORMAT_DATE } from "../constants/date";

export function formatDateInDDMMYYYYString(date: Date) {
  return moment(date).format(FORMAT_DATE.DAY_MONTH_YEAR);
}
