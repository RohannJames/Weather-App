const weatherCodeMap = {
    0: ["Clear Sky", "sun.png"],
    1: ["Mainly Clear", "sun.png"],
    2: ["Partly Cloudy", "cloudy.png"],
    3: ["Overcast", "overcast.png"],
    45: ["Fog", "fog.png"],
    48: ["Depositing Rime Fog", "fog.png"],
    51: ["Light Drizzle", "rain.png"],
    53: ["Moderate Drizzle", "rain.png"],
    55: ["Dense Drizzle", "rain.png"],
    56: ["Light Freezing Drizzle", "rain.png"],
    57: ["Dense Freezing Drizzle", "rain.png"],
    61: ["Slight Rain", "rain.png"],
    63: ["Moderate Rain", "rain.png"],
    65: ["Heavy Rain", "rain.png"],
    66: ["Light Freezing Rain", "rain.png"],
    67: ["Dense Freezing Rain", "rain.png"],
    71: ["Light Snow", "snow.png"],
    73: ["Moderate Snow", "snow.png"],
    75: ["Heavy Snow", "snow.png"],
    77: ["Snow Grains", "snow.png"],
    80: ["Slight Rain Showers", "rain.png"],
    81: ["Moderate Rain Showers", "rain.png"],
    82: ["Violent Rain Showers", "rain.png"],
    85: ["Slight Snow Showers", "snow.png"],
    86: ["Heavy Snow Showers", "snow.png"],
    95: ["Thunderstorm", "thunderstorm.png"],
    96: ["Thunderstorm With Slight Hail", "thunderstorm.png"],
    99: ["Thunderstorm With Heavy Hail", "thunderstorm.png"]
};
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", getWeather);

async function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const geoURL=`https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const geoResponse= await fetch(geoURL);
    const geoData= await geoResponse.json();

     if (!geoData.results || geoData.results.length === 0) {
        alert("City not found. Please enter a valid city.");
        return;
    }

    const latitude= geoData.results[0].latitude;
    const longitude= geoData.results[0].longitude;
    const country= geoData.results[0].country;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.current_weather.temperature;
    const windSpeed = weatherData.current_weather.windspeed;
    const weatherCode = weatherData.current_weather.weathercode;
    const [weatherCondition, weatherImage] = weatherCodeMap[weatherCode];

    document.getElementById("cityName").textContent = `${city}, ${country}`;
    document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeed} km/h`;
    document.getElementById("condition").textContent = `Condition: ${weatherCondition}`;
    document.getElementById("weatherIcon").src = weatherImage;

    
};