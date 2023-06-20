interface Props {
    title: string;
    array: {
        title: string;
        temp?: number;
        description: any;
        icon: any;
        wind?: number;
        temp_max?: number;
        temp_min?: number;
    }[];
    units: "imperial" | "metric";
}

const Forcast = ({ title, array, units }: Props) => {
    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2" />
            <div className="flex flex-row items-center justify-between text-white my-3 px-3">
                {array.map((value) => {
                    return (
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-light text-sm">{value.title}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${value.icon}@2x.png`}
                                alt=""
                                className="w-12"
                            />
                            {"temp" in value && (
                                <p className="font-light text-sm mb-1 capitalize">
                                    <span className="font-medium">{value.temp}°</span> {value.description}
                                </p>
                            )}
                            {"wind" in value && value.wind != undefined && (
                                <p className="font-light  text-sm">
                                    {units == "metric"
                                        ? `${Math.round(value.wind)} kph `
                                        : `${Math.round(value.wind)} mph `}
                                    {value.wind}°
                                </p>
                            )}

                            {"temp_min" in value && "temp_max" in value && (
                                <>
                                    <p className="font-medium mb-1">
                                        <span className="">
                                            {value.temp_max}°<span className="font-extralight"> / </span>
                                            {value.temp_min}°
                                        </span>{" "}
                                    </p>
                                    <p className="font-light text-sm  capitalize">{value.description}</p>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forcast;
