import { useEffect, useState } from "react";
import "./App.css";
import Forcast from "./components/Forcast";
import Inputs from "./components/Inputs";
import TempDetails from "./components/TempDetails";
import TimeLocation from "./components/TimeLocation";
import TopButtons from "./components/TopButtons";
import { getFormattedWeatherData } from "./services/weatherService";
import { Settings } from "luxon";

function App() {
    Settings.defaultZone = "utc";

    let cities = ["Toronto", "New York", "London", "Los Angeles", "Paris", "Berlin"];

    const [query, setQuery] = useState({ q: "toronto" });
    const [units, setUnits] = useState<"imperial" | "metric">("metric");
    const [weather, setWeather] = useState<{ [key: string]: any }>();

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                setWeather(data);
            });
        };

        fetchWeather();
    }, [query, units, setQuery, setUnits]);

    const formatBackground = () => {
        const threshold = units == "metric" ? 25 : 75;

        if (weather == undefined || weather.weather.temp < threshold) return "from-cyan-600 to-blue-900";

        return "from-yellow-600 to-orange-700";
    };

    return (
        <div
            className={`mx-auto max-w-screen-lg mt-4 py-6 px-24 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 rounded-2xl font-primary"`}
        >
            <TopButtons cities={cities} setQuery={setQuery} />
            <Inputs setQuery={setQuery} setUnits={setUnits} />
            {weather != undefined && (
                <>
                    <TimeLocation time={weather.time} city={weather.weather.name} country={weather.weather.country} />
                    <TempDetails
                        details={weather.weather.description}
                        feels_like={weather.weather.feels_like}
                        icon={weather.weather.icon}
                        temp={weather.weather.temp}
                        temp_min={weather.weather.temp_min}
                        temp_max={weather.weather.temp_max}
                        humidity={weather.weather.humidity}
                        pressure={weather.weather.pressure}
                        sunrise={weather.weather.sunrise}
                        sunset={weather.weather.sunset}
                        wind={weather.weather.speed}
                        deg={weather.weather.deg}
                        timezone={weather.weather.timezone}
                        units={units}
                    />
                    <Forcast title="hourly forcast" array={weather.forecast.hourly} units={units} />
                    <Forcast title="daily forcast" array={weather.forecast.daily} units={units} />
                </>
            )}
        </div>
    );
}

export default App;
