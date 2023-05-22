// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=e9e7d5e383492b6701141837a3db35df

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
    let dataFetch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    let data = await dataFetch.json();
    // console.log(data);
    let latitude = await data[0].lat;
    let longitude = await data[0].lon;
    displayWeather(latitude, longitude);
}

function displayWeather(lat, lon){
    // console.log(lat);
    // console.log(lon);
    // let weatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    let weatherFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    weatherFetch
    .then((response) => response.json())
    .then((data) => {
        weatherData.textContent = data.city.name;
        let dataArray = data.list;
        for(let i=0; i<5; i++){
            icon = dataArray[i].weather[0].icon;
            // console.log(dataArray[i].main.feels_like);
            // console.log(dataArray[i].main.temp_max);
            // console.log(dataArray[i].main.temp_min);
            let weatherDiv = document.createElement('div');
            weatherDiv.innerHTML = `day ${i+1} :<br>
            weather : ${dataArray[i].weather[0].main} - ${dataArray[i].weather[0].description}<br> 
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"><br>
            mean temperature : ${dataArray[i].main.temp}°C<br>
            humidity : ${dataArray[i].main.humidity}%<br>
            pressure : ${dataArray[i].main.pressure}Pa<br>
            <hr>`
            weatherData.appendChild(weatherDiv);
        }
    })
}

weatherForm.addEventListener('submit', getCity);

