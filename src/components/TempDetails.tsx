import { formatToLocalTime } from "../services/weatherService";

import UilTemperatureThreeQuarter from "../assets/temperature-three-quarter.svg";
import UilTachometerFast from "../assets/tachometer-fast.svg";
import UilSunset from "../assets/sunset.svg";
import UilSun from "../assets/sun.svg";
import UilWind from "../assets/wind.svg";
import UilArrowUp from "../assets/arrow-up.svg";
import UilArrowDown from "../assets/arrow-down.svg";
import UilWater from "../assets/water.svg";

interface Props {
    details: string;
    icon: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    sunrise: number;
    sunset: number;
    humidity: number;
    wind: number;
    deg: number;
    pressure: number;
    feels_like: number;
    timezone: number;
    units: "imperial" | "metric";
}

const TempDetails = ({
    details,
    feels_like,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    humidity,
    wind,
    deg,
    pressure,
    timezone,
    units,
}: Props) => {
    return (
        <div className="mx-10">
            <div className="flex items-center justify-center py-3 text-xl text-cyan-200 capitalize">
                <p>{details}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-white py-3">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} className="w-36" />
                <p className="text-5xl font-light">{temp}°</p>
                <div className="flex flex-col space-y-2 items-start">
                    <div className="flex font-light text-sm items-center justify-center">
                        <img src={UilTemperatureThreeQuarter} className="mr-1" width={23} />
                        Real Feel:
                        <span className="font-medium">{feels_like}°</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <img src={UilWater} className="mr-1" width={23} />
                        Humidity:
                        <span className="font-medium ml-1">{humidity}%</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <img src={UilTachometerFast} className="mr-1" width={23} />
                        Pressure:
                        <span className="font-medium ml-1">{Math.round(pressure / 10)} kpa</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <img src={UilWind} className="mr-1" width={23} />
                        Wind:
                        <span className="font-medium ml-1">
                            {units == "metric" ? `${Math.round(wind)} kph` : `${Math.round(wind)} mph`} {deg}°
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4 py-3 text-white text-sm">
                <img src={UilSun} alt="" width={25} />

                <p className="font-light">
                    Rise: <span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "h:mm a")}</span>
                </p>
                <p className="font-extralight">|</p>
                <img src={UilSunset} alt="" width={25} />
                <p className="font-light">
                    Set: <span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "h:mm a")}</span>
                </p>
                <p className="font-extralight">|</p>
                <img src={UilArrowUp} alt="" width={25} />
                <p className="font-light">
                    High: <span className="font-medium ml-1">{temp_max}°</span>
                </p>
                <p className="font-extralight">|</p>
                <img src={UilArrowDown} alt="" width={25} />
                <p className="font-light">
                    Low: <span className="font-medium ml-1">{temp_min}°</span>
                </p>
            </div>
        </div>
    );
};

export default TempDetails;
