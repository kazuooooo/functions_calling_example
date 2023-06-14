import { WeatherAPIResponse } from "./types.ts";

export const getWeather = (
  location: string,
  date: string
): Promise<WeatherAPIResponse> => {
  // NOTE: モックの実装実際には非同期のAPIリクエストが入る。
  return new Promise((resolve) => resolve({ date, location, weather: "晴れ" }));
};
