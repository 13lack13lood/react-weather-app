interface Props {
    cities: string[];
    setQuery: (query: any) => void;
}

const TopButtons = ({ cities, setQuery }: Props) => {
    return (
        <div className="flex items-center justify-around my-6 mx-3">
            {cities.map((city, index) => {
                return (
                    <button
                        onClick={() => setQuery({ q: city })}
                        key={index}
                        className="text-white text-lg font-normal transition ease-in-out hover:scale-125 duration-200"
                    >
                        {city}
                    </button>
                );
            })}
        </div>
    );
};

export default TopButtons;
