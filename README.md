# WeatherAPI

A simple weather application that fetches current weather data for a specified city using the WeatherAPI service. The app caches responses in Redis to improve performance and reduce API calls.

## Features

- Fetch current weather data for any city.
- Caches weather data in Redis for 15 minutes.
- Rate limiting to prevent abuse (100 requests per 15 minutes per IP).
- Default city is set to London if no city is provided.

## Prerequisites

- Node.js (v14 or higher)
- Redis server
- WeatherAPI key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Doni-githu/weather_App.git
   cd weatherapi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   WEATHER_API_KEY=your_weather_api_key
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   PORT=3000
   ```

4. Start the Redis server if not already running.

## Usage

1. Start the application in development mode:
   ```bash
   npm run dev
   ```

2. Use the provided `api.http` file to test the API endpoint:
   ```http
   GET http://localhost:3000/api/weather?city=Paris
   ```

3. Replace `Paris` with any city name to fetch weather data for that city.

## API Endpoints

### GET `/api/weather`

Fetches the current weather for a specified city.

#### Query Parameters:
- `city` (optional): The name of the city. Defaults to `London`.

#### Response:
- `temp_c`: Current temperature in Celsius.
- `condition`: Weather condition description.
- `city`: Name of the city.
- `country`: Name of the country.

#### Example:
```json
{
  "temp_c": 18.5,
  "condition": "Partly cloudy",
  "city": "Paris",
  "country": "France"
}
```

## License

This project is licensed under the ISC License.
[demo URL](https://weather-app-mu6e.onrender.com)