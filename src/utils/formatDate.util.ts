import moment from "moment";
import { FORMAT_DATE } from "../constants/date";

export function formatDateInDDMMYYYYString(date: Date) {
  return moment(date).format(FORMAT_DATE.DAY_MONTH_YEAR);
}

export function formatHourAndDayMonth(date: number): string {
  return moment(date).format(FORMAT_DATE.HOUR_DAY_MONTH);
}
