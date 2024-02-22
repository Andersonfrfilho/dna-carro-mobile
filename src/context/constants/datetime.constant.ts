import { ItemListDto } from "../../modules/common/common.interface";

export interface DaysItemList extends ItemListDto {
  selected: boolean;
}

export enum DAYS_WEEK_IDS {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}

export enum DAYS_WEEK {
  SUNDAY = "domingo",
  MONDAY = "segunda",
  TUESDAY = "terça",
  WEDNESDAY = "quarta",
  THURSDAY = "quinta",
  FRIDAY = "sexta",
  SATURDAY = "sábado",
}

export const DAYS_WEEK_SELECT_ITEMS: DaysItemList[] = [
  {
    label: DAYS_WEEK.MONDAY,
    id: DAYS_WEEK_IDS.SUNDAY,
    value: DAYS_WEEK_IDS.SUNDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.MONDAY,
    id: DAYS_WEEK_IDS.MONDAY,
    value: DAYS_WEEK_IDS.MONDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.TUESDAY,
    id: DAYS_WEEK_IDS.TUESDAY,
    value: DAYS_WEEK_IDS.TUESDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.WEDNESDAY,
    id: DAYS_WEEK_IDS.WEDNESDAY,
    value: DAYS_WEEK_IDS.WEDNESDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.THURSDAY,
    id: DAYS_WEEK_IDS.THURSDAY,
    value: DAYS_WEEK_IDS.THURSDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.FRIDAY,
    id: DAYS_WEEK_IDS.FRIDAY,
    value: DAYS_WEEK_IDS.FRIDAY,
    selected: false,
  },
  {
    label: DAYS_WEEK.SATURDAY,
    id: DAYS_WEEK_IDS.SATURDAY,
    value: DAYS_WEEK_IDS.SATURDAY,
    selected: false,
  },
];
