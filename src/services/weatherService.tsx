import { DateTime } from "luxon";

const API_KEY = "7844798d0e4e8a93bbe6802b6c7d770c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType: string, searchParams: { [key: string]: string }) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.searchParams.append("appid", API_KEY);
    Object.entries(searchParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    return await (await fetch(url)).json();
};

const formatWeatherData = (data: any) => {
    let {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        name,
        dt,
        timezone,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed, deg },
    } = data;

    temp = Math.round(temp);
    feels_like = Math.round(feels_like);
    temp_min = Math.round(temp_min);
    temp_max = Math.round(temp_max);
    pressure = Math.round(pressure);

    const { details, description, icon } = weather[0];
    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        pressure,
        name,
        dt,
        timezone,
        country,
        sunrise,
        sunset,
        details,
        description,
        icon,
        speed,
        deg,
    };
};

const formatForecastData = (data: any, timezone: number) => {
    let { list }: { list: any[] } = data;
    let hourly = list.slice(0, 5).map((forecastData: any) => {
        return {
            title: formatToLocalTime(forecastData.dt, timezone, "h:mm a"),
            temp: Math.round(forecastData.main.temp),
            description: forecastData.weather[0].main,
            icon: forecastData.weather[0].icon,
            wind: Math.round(forecastData.wind.speed * 10) / 10,
        };
    });
    let forecast: any[] = list.map((forecastData: any) => {
        return {
            title: formatToLocalTime(forecastData.dt, timezone, "ccc"),
            temp_max: forecastData.main.temp_max,
            temp_min: forecastData.main.temp_min,
            description: forecastData.weather[0].main,
            icon: forecastData.weather[0].icon,
        };
    });

    let count = 0,
        start = forecast[0].title;

    for (let i = 0; i < 9; i++) {
        if (count < 8 && start == forecast[i].title) {
            count++;
        } else {
            break;
        }
    }

    if (count != 8) {
        forecast = forecast.slice(count);
    }

    let daily = [];

    for (let i = 0; i < forecast.length; i += 8) {
        let max = 0,
            min = 1000;
        let descriptions: { [key: string]: number } = {},
            icons: { [key: string]: number } = {};

        for (let j = i; j < i + 8 && j < forecast.length; j++) {
            max = Math.max(forecast[j].temp_max, max);
            min = Math.min(forecast[j].temp_min, min);

            if (descriptions.hasOwnProperty(forecast[j].description)) {
                descriptions[forecast[j].description]++;
            } else {
                descriptions[forecast[j].description] = 1;
            }

            if (icons.hasOwnProperty(forecast[j].icon) && forecast[j].icon.includes("d")) {
                icons[forecast[j].icon]++;
            } else if (forecast[j].icon.includes("d")) {
                icons[forecast[j].icon] = 1;
            }
        }

        let description = "",
            description_max = 0,
            icon = "",
            icon_max = 0;

        Object.entries(descriptions).forEach(([key, value]) => {
            if (value > description_max) {
                description = key;
                description_max = value;
            }
        });

        Object.entries(icons).forEach(([key, value]) => {
            if (value > icon_max) {
                icon = key;
                icon_max = value;
            }
        });

        daily.push({
            title: forecast[i].title,
            temp_max: Math.round(max),
            temp_min: Math.round(min),
            description: description,
            icon: icon,
        });
    }

    return { hourly, daily };
};

const formatToLocalTime = (secs: number, zone: number, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs)
        .plus(zone * 1000)
        .toFormat(format);

const getFormattedWeatherData = async (searchParams: { [key: string]: string }) => {
    const formattedWeather = await getWeatherData("weather", searchParams).then(formatWeatherData);

    const formattedForecast = await getWeatherData("forecast", searchParams).then((data) => {
        return formatForecastData(data, formattedWeather.timezone);
    });

    return {
        weather: formattedWeather,
        forecast: formattedForecast,
        time: formatToLocalTime(formattedWeather.dt, formattedWeather.timezone),
    };
};

export { getFormattedWeatherData, formatToLocalTime };
