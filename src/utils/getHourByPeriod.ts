import { AvailableHoursItems } from "../services/api/providers/providers.interface";

interface ParamsDto {
  items: AvailableHoursItems[];
  start: string;
  end: string;
  selected: boolean;
}

export function getHoursByPeriodFifteenMinutes(
  data: ParamsDto
): AvailableHoursItems[] {
  const newList = data.items.map((hour, index) => {
    const [hourSeparated, minuteSeparated] = hour.hour.split(":");
    const isBetween = data.items.some(() => {
      const [startHourProvider, startMinuteProvider] = data.start.split(":");
      const [endHourProvider, endMinuteProvider] = data.end.split(":");
      const dateStart = new Date(
        2020,
        1,
        1,
        parseInt(startHourProvider, 10),
        parseInt(startMinuteProvider, 10),
        0,
        0
      );
      const dateEnd = new Date(
        2020,
        1,
        1,
        parseInt(endHourProvider, 10),
        parseInt(endMinuteProvider, 10),
        0,
        0
      );
      const dateCurrentList = new Date(
        2020,
        1,
        1,
        parseInt(hourSeparated, 10),
        parseInt(minuteSeparated, 10),
        0,
        0
      );
      if (
        dateCurrentList.getTime() >= dateStart.getTime() &&
        dateCurrentList.getTime() <= dateEnd.getTime()
      ) {
        return true;
      }
      return false;
    });

    if (isBetween) {
      return {
        ...hour,
        selected: data.selected,
      };
    } else {
      return {
        ...hour,
        selected: hour.selected,
      };
    }
  });
  return newList;
}
