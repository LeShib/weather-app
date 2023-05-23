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
            cityDiv.innerHTML = `<h3>${data.city.name}</h3>`;
            weatherData.appendChild(cityDiv);

            let fullDate = new Date();
            let date0 = fullDate.getFullYear() + "-0" + (fullDate.getMonth()+1) + "-" + fullDate.getDate();
            let date1 = fullDate.getFullYear() + "-0" + (fullDate.getMonth()+1) + "-" + (fullDate.getDate()+1);
            let date2 = fullDate.getFullYear() + "-0" + (fullDate.getMonth()+1) + "-" + (fullDate.getDate()+2);
            let date3 = fullDate.getFullYear() + "-0" + (fullDate.getMonth()+1) + "-" + (fullDate.getDate()+3);
            let date4 = fullDate.getFullYear() + "-0" + (fullDate.getMonth()+1) + "-" + (fullDate.getDate()+4);
            let fiveDaysDates = [];
            fiveDaysDates.push(date0, date1, date2, date3, date4);
            console.log(fiveDaysDates);
            let temperatureByDay = [];
            let maxTemp = dataArray[0].main.temp_max;
            let minTemp = dataArray[0].main.temp_min;

            fiveDaysDates.forEach(day => {
                dataArray.forEach(element => {
                    let fullDates = element.dt_txt;
                    let date = fullDates.split(' ');
                    if(date[0] === day){
                        if(element.main.temp_max >= maxTemp){
                            maxTemp = element.main.temp_max;
                        }
                        if(element.main.temp_min <= minTemp){
                            minTemp = element.main.temp_min;
                        }
                    }
                });
                temperatureByDay.push({date: day, min: minTemp, max: maxTemp});
                minTemp = 100;
                maxTemp = -100;
            });
            console.log(temperatureByDay);

            let temperatureData = [];
            let labels = [];
            let j = 0;

            for (let i = 0; i < dataArray.length; i += 8) {
                temperatureData.push({ min: temperatureByDay[j].min, max: temperatureByDay[j].max });
                labels.push(temperatureByDay[j].date);

                let icon = dataArray[i].weather[0].icon;
                let weatherDiv = document.createElement('div');
                weatherDiv.setAttribute("class", "dayCard");
                weatherDiv.innerHTML = `${temperatureByDay[j].date}:<br>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png"><br>
                Weather: ${dataArray[i].weather[0].description}<br> 
                Temperature min: ${temperatureByDay[j].min}°C<br>
                Temperature max: ${temperatureByDay[j].max}°C<br>
                Humidity: ${dataArray[i].main.humidity}%<br>
                Pressure: ${dataArray[i].main.pressure}Pa<br>
                Wind speed: ${dataArray[i].wind.speed}Km/h`
                j++
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