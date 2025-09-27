import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import type { SingleValue } from 'react-select';
import rawCities from 'cities.json';
import { FaWind } from 'react-icons/fa6';
import { IoSpeedometer } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';


const cities = rawCities as RawCity[];

type RawCity = {
    name: string;
    lat: string;
    lng: string;
    country: string;
};

type CityOption = {
    label: string;
    value: string;
    lat: string;
    lng: string;
    country: string;
};

function getDate() {
    let month = '';
    const today = new Date();
    const monthNumber = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    switch (monthNumber) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
    }
    return `${day} ${month} ${year}`;
}

const weather_APP = () => {

    const [weatherData, setWeatherData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState(getDate());
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
    const options: CityOption[] = cities.map((city) => ({
        label: `${city.name}, ${city.country}`,
        value: city.name,
        lat: city.lat,
        lng: city.lng,
        country: city.country,
    }));


    const fetchWeatherData = async (city: CityOption) => {
        try {
            const response = await fetch(`http://localhost:3000/weather?lat=${city.lat}&lon=${city.lng}`);
            const data = await response.json();
            console.log("Weather API data:", data);
            setWeatherData(data);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again later.');
        }
    }

    const fetchWeatherDataforecast = async (city: CityOption) => {
        try {
            const response = await fetch(`http://localhost:3000/weather/forecast?lat=${city.lat}&lon=${city.lng}`);
            const data = await response.json();
            console.log("Weather API data forecast:", data);
            setForecastData(data);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again later.');
        }

    }

    const handleChange = (selected: SingleValue<CityOption>) => {
        setSelectedCity(selected);
        console.log("You selected:", selected);
    };

    const loadOptions = (
        inputValue: string,
        callback: (options: CityOption[]) => void
    ) => {
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

        callback(filtered.slice(0, 50));
    };

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherDataforecast(selectedCity);
        }
    }, [selectedCity]);


    return (
        <div className="flex flex-col bg-[#F3F4F6] min-h-screen">
            <div className="flex flex-col justify-self-start bg-[#FFFFFF] ">
                <div className="flex flex-row justify-between p-4">
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder="Start typing a city..."
                        isClearable
                        classNames={{
                            control: () => 'border border-gray-300 overflow-hidden text-sm rounded p-2 bg-white',
                            input: () => 'text-sm',
                            menu: () => 'bg-white border border-gray-300 mt-1 rounded shadow-lg',
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-row p-4 text-xl">
                <img src={weatherData ? `https:${weatherData.current.condition.icon}` : ''} alt={weatherData ? weatherData.current.condition.text : ''} className='w-12 h-12 mr-2' />{' '}
                {weatherData ? weatherData.current.temp_c + '°C' : 'choose a city'}
            </div>
            <div className="flex text-m ml-4">
                {date}
            </div>
            <div className="flex flex-row text-sm p-4">
                <div className="flex flex-col items-center justify-center w-1/3 px-4 mx-4 bg-[#E5E7EB] rounded-lg">
                    <FaWind className='m-2 w-6 h-6' />
                    <div>
                        Wind
                    </div>
                    <div>
                        {weatherData ? weatherData.current.wind_kph + ' km/h' : ''}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 px-4 mx-4 bg-[#E5E7EB] rounded-lg">
                    <IoSpeedometer className='m-2 w-6 h-6' />
                    <div>
                        Pressure
                    </div>
                    <div>
                        {weatherData ? weatherData.current.pressure_mb + ' mb' : ''}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 px-4 mx-4 bg-[#E5E7EB] rounded-lg">
                    <FaEye className='m-2 w-6 h-6' />
                    <div>
                        Visibility
                    </div>
                    <div>
                        {weatherData ? weatherData.current.vis_km + ' km' : ''}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between p-2 bg-[#FFFFFF] rounded-lg m-2">
                {forecastData ? forecastData.forecast.forecastday[0].hour.map((h: any, index: number) => (
                    <div key={index}>
                        <div className="flex flex-col">
                            <div className='text-sm'>
                                {(new Date(h.time)).getHours()}:00
                            </div>
                            <div className='text-sm'>
                                {h.temp_c}°C
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <img src={`https:${h.condition.icon}`} alt={h.condition.text} className='w-8 h-8' />
                        </div>
                    </div>
                ))
                    : <div>You need to select a city to see the forecast.</div>}
            </div>
        </div>
    )
}

export default weather_APP