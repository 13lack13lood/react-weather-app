interface Props {
    time: string;
    city: string;
    country: string;
}

const TimeLocation = ({ time, city, country }: Props) => {
    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight">{time}</p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-white text-4xl font-medium">
                    {city}, {country}
                </p>
            </div>
        </div>
    );
};

export default TimeLocation;
