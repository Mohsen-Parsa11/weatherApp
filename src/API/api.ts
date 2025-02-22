import axios from "axios";

export async function getCurrentWeather(lat:string,lon:string) {
  const client = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
  });

  const appKey = "d222e3c9939ce5ceb7d48899ca3cc827";

  const { data } = await client(`weather?lat=${lat}&lon=${lon}&appid=${appKey}`);

  return data;
}
