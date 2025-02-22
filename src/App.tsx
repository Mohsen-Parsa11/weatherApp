import { useState } from "react";
import "./index.css";
import { getCurrentWeather } from "./API/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { weatherType } from "./types/sever";

interface City {
  id: number;
  name: string;
  lat: string;
  lon: string;
}

const data = [
  {
    id: "1",
    name: "Kabul",
    lat: "34.543896",
    lon: "69.160652",
  },
  {
    id: "2",
    name: "Herat",
    lat: "34.343044",
    lon: "62.199074",
  },
  {
    id: "3",
    name: "Mazar-i-Sharif",
    lat: "36.715771",
    lon: "67.105865",
  },
  {
    id: "4",
    name: "Nangarhar",
    lat: "34.17183130",
    lon: "70.62167940",
  }
];

function App() {
  const [currentWeather, setCurrentWeather] = useState<weatherType>();

  const sunrise = new Date((currentWeather?.sys.sunrise ?? 0) * 1000);
  const sunset = new Date((currentWeather?.sys.sunset ?? 0) * 1000);

  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var today = new Date();
const todayTime = today.toLocaleDateString("en-US", options);

  const handleChangeWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedLocation: City = JSON.parse(value);
    getCurrentWeather(selectedLocation.lat, selectedLocation.lon)
      .then((result) => {
        console.log(result);
        setCurrentWeather(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Carousel
        showThumbs={false}
        className="flex flex-col my-4 max-w-4xl mx-4 mt-6 g:mx-0 lg:mx-auto bg-gradient-to-b from-blue-800 to-green-500 rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col w-full p-4">
          <h2 className="text-white text-3xl mb-1">{todayTime}</h2>
          <h3 className="text-white text-lg">{currentWeather?.name}</h3>
          <div className="flex justify-around my-8 px-4">
            <img
              src="https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png"
              className="!w-72 mx-auto"
              alt=""
            />
            <div className="flex flex-col items-center space-y-6 my-4 text-white">
              <select
                onChange={handleChangeWeather}
                className=" w-56 outline-none"
              >
                {data.map((item) => (
                  <option
                    key={item.id}
                    value={JSON.stringify(item)}
                    className="text-black"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="material-icons text-6xl">
                {currentWeather?.weather[0].main}
              </span>
              <div className="ml-4">
                <p className="text-lg">
                  {currentWeather?.weather[0].description}
                </p>
                <p className="text-4xl">{currentWeather?.clouds.all}°</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-white text-sm">
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
          </div>
          <div className="flex justify-between text-white text-sm">
            <span>29°</span>
            <span>29°</span>
            <span>28°</span>
            <span>27°</span>
            <span>25°</span>
            <span>23°</span>
          </div>
        </div>

        <div className="w-full p-4 border-l border-white md:border-l-0 md:border-t md:border-b md:border-white">
          <div className="text-white">
            <h2 className="text-white text-3xl mb-1">{todayTime}</h2>
            <h3 className="text-white text-lg">{currentWeather?.name}</h3>
            <img
              src="https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png"
              className="!w-72 mx-auto pt-6"
              alt=""
            />
            <div className="flex justify-between px-4">
              <div className="text-left">
                <p>Wind:</p>
                <p>Humidity:</p>
                <p>Atm pressure:</p>
                <p>Water:</p>
                <p>sunrise:</p>
                <p>sunset:</p>
              </div>
              <div>
                <p>{currentWeather?.wind.speed} m/s</p>
                <p>{currentWeather?.main.humidity}%</p>
                <p>{currentWeather?.main.pressure} mmHg</p>
                <p>{currentWeather?.main.sea_level}°</p>
                <p>{`${sunrise.getHours()}: ${sunrise.getMinutes()}`}</p>
                <p>{`${sunset.getHours()}: ${sunset.getMinutes()}`}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-white text-sm">
            <span>Now</span>
            <span>21:00</span>
            <span>22:00</span>
            <span>23:00</span>
            <span>00:00</span>
            <span>01:00</span>
          </div>
          <div className="flex justify-between text-white text-sm">
            <span>29°</span>
            <span>29°</span>
            <span>29°</span>
            <span>28°</span>
            <span>28°</span>
            <span>28°</span>
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default App;
