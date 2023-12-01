import moment from "moment";
import { UTC_OFF_SET } from "../constants/date";

export const getDateUnix = (date: string): number => {
  const saoPauloTimezone = moment(date, "DD/MM/YYYY").utcOffset(UTC_OFF_SET);
  const epochTime = saoPauloTimezone.valueOf();
  return epochTime;
};
