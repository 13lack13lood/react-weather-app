import { useState } from "react";

import UilSearch from "../assets/search.svg";
import UilLocationPinAlt from "../assets/location-pin-alt.svg";

interface Props {
    setUnits: (unit: "imperial" | "metric") => void;
    setQuery: (query: any) => void;
}

const Inputs = ({ setUnits, setQuery }: Props) => {
    const [city, setCity] = useState("");

    const handleSearchClick = () => {
        if (city != "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude,
                    lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };

    return (
        <div className="flex flex-row justify-center my-6 mx-10">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    type="text"
                    className="text-xl font-light p-2 w-full shadow-xl rounded-full focus:outline-none capitalize indent-3 placeholder:lowercase placeholder:font-extralight"
                    placeholder="search for city..."
                    onChange={(e) => setCity(e.currentTarget.value)}
                    value={city}
                    onKeyDown={(event) => {
                        if (event.key == "Enter") {
                            setCity(event.currentTarget.value);
                            handleSearchClick();
                            setCity("");
                        }
                    }}
                />
                <img
                    src={UilSearch}
                    alt=""
                    width={25}
                    className="cursor-pointer transition ease-out hover:scale-150"
                    onClick={handleSearchClick}
                />

                <img
                    src={UilLocationPinAlt}
                    alt=""
                    width={25}
                    className="cursor-pointer transition ease-out hover:scale-150"
                    onClick={handleLocationClick}
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-end pl-5">
                <button
                    name="metric"
                    className="text-xl text-white font-light transition ease-out hover:scale-150"
                    onClick={() => setUnits("metric")}
                >
                    °C
                </button>
                <p className="text-xl text-white font-thin mx-3">|</p>
                <button
                    name="imperial"
                    className="text-xl text-white font-light transition ease-out hover:scale-150"
                    onClick={() => setUnits("imperial")}
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default Inputs;
