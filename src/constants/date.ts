export enum DATE_TYPE_MODE_PICKER {
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  COUNTDOWN = "countdown",
}

export const FORMAT_DATE = {
  DAY_MONTH_YEAR: "DD/MM/YYYY",
  HOUR_DAY_MONTH: "HH:mm - DD/MM",
};

export const UTC_OFF_SET = -3;

const FIFTY_MINUTES = 1000 * 60 * 50;
const THIRTY_MINUTES = 1000 * 60 * 30;
const FORTY_FIVE_MINUTES = 1000 * 60 * 45;
const ONE_HOUR = 1000 * 60 * 60;

export interface DurationValue {
  value: number;
  label: string;
}
export const DURATION_VALUES = [
  {
    value: FIFTY_MINUTES,
    label: "15 minutos",
  },
  {
    value: THIRTY_MINUTES,
    label: "30 minutos",
  },
  {
    value: FORTY_FIVE_MINUTES,
    label: "45 minutos",
  },
  {
    value: ONE_HOUR,
    label: "1 hora",
  },
  {
    value: ONE_HOUR + FIFTY_MINUTES,
    label: "1 hora e 15 minutos",
  },
  {
    value: ONE_HOUR + THIRTY_MINUTES,
    label: "1 hora e 30 minutos",
  },
  {
    value: ONE_HOUR + FORTY_FIVE_MINUTES,
    label: "1 hora e 45 minutos",
  },
  {
    value: ONE_HOUR * 2,
    label: "2 horas",
  },
  {
    value: ONE_HOUR * 2 + FIFTY_MINUTES,
    label: "2 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 2 + THIRTY_MINUTES,
    label: "2 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 2 + FORTY_FIVE_MINUTES,
    label: "2 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 3,
    label: "3 horas",
  },
  {
    value: ONE_HOUR * 3 + FIFTY_MINUTES,
    label: "3 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 3 + THIRTY_MINUTES,
    label: "3 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 3 + FORTY_FIVE_MINUTES,
    label: "3 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 4,
    label: "4 horas",
  },
  {
    value: ONE_HOUR * 4 + FIFTY_MINUTES,
    label: "4 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 4 + THIRTY_MINUTES,
    label: "4 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 4 + FORTY_FIVE_MINUTES,
    label: "4 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 5,
    label: "5 horas",
  },
  {
    value: ONE_HOUR * 5 + FIFTY_MINUTES,
    label: "5 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 5 + THIRTY_MINUTES,
    label: "5 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 5 + FORTY_FIVE_MINUTES,
    label: "5 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 6,
    label: "6 horas",
  },
  {
    value: ONE_HOUR * 6 + FIFTY_MINUTES,
    label: "6 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 6 + THIRTY_MINUTES,
    label: "6 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 6 + FORTY_FIVE_MINUTES,
    label: "6 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 7,
    label: "7 horas",
  },
  {
    value: ONE_HOUR * 7 + FIFTY_MINUTES,
    label: "7 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 7 + THIRTY_MINUTES,
    label: "7 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 7 + FORTY_FIVE_MINUTES,
    label: "7 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 8,
    label: "8 horas",
  },
  {
    value: ONE_HOUR * 8 + FIFTY_MINUTES,
    label: "8 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 8 + THIRTY_MINUTES,
    label: "8 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 8 + FORTY_FIVE_MINUTES,
    label: "8 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 9,
    label: "9 horas",
  },
  {
    value: ONE_HOUR * 9 + FIFTY_MINUTES,
    label: "9 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 9 + THIRTY_MINUTES,
    label: "9 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 9 + FORTY_FIVE_MINUTES,
    label: "9 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 10,
    label: "10 horas",
  },
  {
    value: ONE_HOUR * 10 + FIFTY_MINUTES,
    label: "10 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 10 + THIRTY_MINUTES,
    label: "10 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 10 + FORTY_FIVE_MINUTES,
    label: "10 horas e 45 minutos",
  },
  {
    value: ONE_HOUR * 11,
    label: "11 horas",
  },
  {
    value: ONE_HOUR * 11 + FIFTY_MINUTES,
    label: "11 horas e 15 minutos",
  },
  {
    value: ONE_HOUR * 11 + THIRTY_MINUTES,
    label: "11 horas e 30 minutos",
  },
  {
    value: ONE_HOUR * 11 + FORTY_FIVE_MINUTES,
    label: "11 horas e 45 minutos",
  },
];
