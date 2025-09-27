import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
dotenv.config({path: './src/.env'})

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get('/weather', async (req, res) => {
    const {lat, long, city} = req.query;
    const key = process.env.key;
    let queryParam = '';
    
    if (lat && long) {
        queryParam = `${lat},${long}`;
    } else if (city) {
        queryParam = city;
    } else {
        queryParam = 'Bucharest';
    }

    console.log (`Fetching weather for lat: ${lat}, long: ${long}`);
    try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json',{
            params: {
                key: process.env.key,
                q: queryParam
            },
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch weather data.'});
        console.log('Error fetching weather data:', error.message);
    }
});

app.get('/weather/forecast', async (req, res) => {
    const {lat, lon, city} = req.query; 
    const key = process.env.key;
    let queryParam = '';

    if (lat && lon) {
        queryParam = `${lat},${lon}`;
    } else if (city) {
        queryParam = city;
    } else {
        queryParam = 'Bucharest';
    }

    console.log (`Fetching forecast for lat: ${lat}, lon: ${lon}`);
    try {
        const response = await axios.get('https://api.weatherapi.com/v1/forecast.json',{
            params: {
                key: process.env.key,
                q: queryParam,
                days: 3, 
                aqi: 'no',
                alerts: 'no'
            },
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch forecast data.'});
        console.log('Error fetching forecast data:', error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});