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
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

const weather_APP_2 = () => {
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
            setWeatherData(data);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again later.');
        }
    };

    const fetchWeatherDataforecast = async (city: CityOption) => {
        try {
            const response = await fetch(`http://localhost:3000/weather/forecast?lat=${city.lat}&lon=${city.lng}`);
            const data = await response.json();
            setForecastData(data);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again later.');
        }
    };

    const handleChange = (selected: SingleValue<CityOption>) => {
        setSelectedCity(selected);
    };

    const loadOptions = (inputValue: string, callback: (options: CityOption[]) => void) => {
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(filtered.slice(0, 50));
    };

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
            fetchWeatherDataforecast(selectedCity);
        }
    }, [selectedCity]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F7FA] to-[#F3F4F6] p-4">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    onChange={handleChange}
                    placeholder="Start typing a city..."
                    isClearable
                    classNames={{
                        control: () =>
                            'border border-gray-300 rounded-lg text-sm p-2 focus:ring-2 focus:ring-blue-400',
                        input: () => 'text-sm',
                        menu: () => 'bg-white border border-gray-300 mt-1 rounded shadow-lg',
                        option: () => 'hover:bg-blue-100 p-2 rounded',
                    }}
                />
            </div>

            <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center mb-2">
                    <img
                        src={weatherData ? `https:${weatherData.current.condition.icon}` : ''}
                        alt={weatherData ? weatherData.current.condition.text : ''}
                        className="w-16 h-16 mr-4"
                    />
                    <div className="text-3xl font-bold">
                        {weatherData ? weatherData.current.temp_c + '°C' : 'Choose a city'}
                    </div>
                </div>
                <div className="text-gray-600">{date}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
                    <FaWind className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="font-semibold">Wind</div>
                    <div className="text-gray-700">{weatherData ? weatherData.current.wind_kph + ' km/h' : '--'}</div>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
                    <IoSpeedometer className="w-8 h-8 text-red-400 mb-2" />
                    <div className="font-semibold">Pressure</div>
                    <div className="text-gray-700">{weatherData ? weatherData.current.pressure_mb + ' mb' : '--'}</div>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
                    <FaEye className="w-8 h-8 text-green-400 mb-2" />
                    <div className="font-semibold">Visibility</div>
                    <div className="text-gray-700">{weatherData ? weatherData.current.vis_km + ' km' : '--'}</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex justify-between overflow-x-auto">
                {forecastData
                    ? forecastData.forecast.forecastday.map((day: any, index: number) => (
                          <div
                              key={index}
                              className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white rounded-xl p-2 mx-1 w-20"
                          >
                              <div className="text-sm font-bold mb-1">
                                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <img
                                  src={`https:${day.day.condition.icon}`}
                                  alt={day.day.condition.text}
                                  className="w-10 h-10 mb-1"
                              />
                              <div className="text-xs">
                                  {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                              </div>
                          </div>
                      ))
                    : <div className="text-gray-500">Select a city to see the forecast</div>}
            </div>
        </div>
    );
};

export default weather_APP_2;
