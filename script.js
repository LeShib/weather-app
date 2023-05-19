// const temperatureChart = document.getElementById('temperatureChart').getContext('2d');
// let latitude;
// let longitude;
// let stateCode;
// let countryCode;

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');

const apiKey = "e9e7d5e383492b6701141837a3db35df";

function getCity(event) {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
}

async function getWeatherData(city){
    dataFetch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    data = await dataFetch.json();
    latitude = await data[0].lat;
    longitude = await data[0].lon;
    displayWeather(latitude, longitude);
}

function displayWeather(lat, lon){
    console.log(lat);
    console.log(lon);
}


weatherForm.addEventListener('submit', getCity);