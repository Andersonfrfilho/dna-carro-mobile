interface ParamsDto {
  readonly minutes: number;
  readonly seconds: number;
}

export function formatMinutesSeconds({ minutes, seconds }: ParamsDto) {
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
