// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=e9e7d5e383492b6701141837a3db35df

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');
const apiKey = "e9e7d5e383492b6701141837a3db35df";

function getCity(event) {
    event.preventDefault();
    let cities = cityInput.value.split(",");
    cities.forEach(city => getWeatherData(city.trim()));
}

async function getWeatherData(city) {
    let dataFetch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    let data = await dataFetch.json();
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    displayWeather(city, latitude, longitude);
}

function displayWeather(city, lat, lon) {
    let weatherFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    weatherFetch.then((response) => response.json())
        .then((data) => {
            console.log(data);
            let dataArray = data.list;
            let cityDiv = document.createElement('div');
            cityDiv.innerHTML = `<h3>${city}</h3>`;
            weatherData.appendChild(cityDiv);

            let temperatureData = [];
            let labels = [];
            let j = 0;

            for (let i = 0; i < 40; i += 8) {
                let temperatures = dataArray.slice(i, i + 8).map(item => item.main.temp);
                let maxTemperature = Math.max(...temperatures);
                let minTemperature = Math.min(...temperatures);
                let dateTime = dataArray[i].dt_txt;

                temperatureData.push({ min: minTemperature, max: maxTemperature });
                labels.push(dateTime);

                let icon = dataArray[i].weather[0].icon;
                let weatherDiv = document.createElement('div');
                j++;
                weatherDiv.innerHTML = `Day ${j}:<br>
                Weather: ${dataArray[i].weather[0].main} - ${dataArray[i].weather[0].description}<br> 
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png"><br>
                Minimum temperature: ${minTemperature}°C<br>
                Maximum temperature: ${maxTemperature}°C<br>
                Humidity: ${dataArray[i].main.humidity}%<br>
                Pressure: ${dataArray[i].main.pressure}Pa<br>
                <hr>`
                cityDiv.appendChild(weatherDiv);
            }

            createChart(city, temperatureData, labels);
        })
}

function createChart(city, temperatureData, labels) {
    const chartCanvas = document.createElement('canvas');
    chartCanvas.setAttribute('id', `${city}-chart`);
    weatherData.appendChild(chartCanvas);

    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Minimum Temperature (°C)',
                data: temperatureData.map(item => item.min),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Maximum Temperature (°C)',
                data: temperatureData.map(item => item.max),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

weatherForm.addEventListener('submit', getCity);


// Comparer chaque jour la température max et la température min 
// Mise en forme de l'affichage 