// Variables
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');
const apiKey = "e9e7d5e383492b6701141837a3db35df";
const cities = [
    "Abou Dhabi",
    "Abuja",
    "Accra",
    "Addis-Abeba",
    "Alger",
    "Amman",
    "Amsterdam",
    "Andorre-la-Vieille",
    "Antananarivo",
    "Apia",
    "Achgabat",
    "Athènes",
    "Bagdad",
    "Bakou",
    "Bamako",
    "Bandar Seri Begawan",
    "Bangkok",
    "Bangui",
    "Banjul",
    "Basseterre",
    "Belgrade",
    "Belmopan",
    "Berlin",
    "Berne",
    "Bichkek",
    "Bissau",
    "Bogota",
    "Brazzaville",
    "Bridgetown",
    "Brisbane",
    "Brasília",
    "Bratislava",
    "Brazzaville",
    "Bridgetown",
    "Brisbane",
    "Brasília",
    "Bratislava",
    "Brazzaville",
    "Bridgetown",
    "Brisbane",
    "Brasília",
    "Bratislava",
    "Bruxelles",
    "Bucarest",
    "Budapest",
    "Bujumbura",
    "Caracas",
    "Castries",
    "Chisinau",
    "Cité du Vatican",
    "Conakry",
    "Copenhague",
    "Dacca",
    "Dakar",
    "Damas",
    "Djibouti",
    "Dodoma",
    "Douchanbé",
    "Dublin",
    "Freetown",
    "Funafuti",
    "Georgetown",
    "Gaborone",
    "Guatemala",
    "Hanoï",
    "Harare",
    "Helsinki",
    "Honiara",
    "Islamabad",
    "Jakarta",
    "Jérusalem",
    "Kaboul",
    "Kampala",
    "Khartoum",
    "Kigali",
    "Kingston",
    "Kingstown",
    "Koweït",
    "La Havane",
    "La Paz",
    "La Valette",
    "Libreville",
    "Lilongwe",
    "Lima",
    "Lisbonne",
    "Ljubljana",
    "Londres",
    "Lomé",
    "Luanda",
    "Lusaka",
    "Luxembourg",
    "Madrid",
    "Majuro",
    "Malabo",
    "Malé",
    "Maputo",
    "Maseru",
    "Masqat",
    "Mbabane",
    "Minsk",
    "Mexico",
    "Monaco",
    "Monrovia",
    "Montevideo",
    "Moroni",
    "Moscou",
    "N'Djaména",
    "Nairobi",
    "Nassau",
    "Ngerulmud",
    "Niamey",
    "Nicosie",
    "Nouakchott",
    "Nouméa",
    "Noursoultan",
    "Ottawa",
    "Oslo",
    "Oulan-Bator",
    "Ouagadougou",
    "Paris",
    "Pékin",
    "Podgorica",
    "Port-au-Prince",
    "Port-Louis",
    "Port Moresby",
    "Porto-Novo",
    "Port-Vila",
    "Prague",
    "Praia",
    "Pristina",
    "Pyongyang",
    "Qatar",
    "Quito",
    "Rangoon",
    "Reykjavik",
    "Riga",
    "Riyad",
    "Rome",
    "Roseau",
    "Saint-Domingue",
    "Saint George's",
    "Saint John's",
    "Sainte-Lucie",
    "San José",
    "San Marino",
    "San Salvador",
    "Sanaa",
    "Santiago",
    "Sarajevo",
    "Skopje",
    "Sofia",
    "São Tomé",
    "Tachkent",
    "Tallinn",
    "Tarawa-Sud",
    "Tbilissi",
    "Tegucigalpa",
    "Téhéran",
    "Thimphou",
    "Tirana",
    "Tokyo",
    "Tripoli",
    "Tunis",
    "Ulan-Bator",
    "Vaduz",
    "Varsovie",
    "Victoria",
    "Vientiane",
    "Vilnius",
    "Washington D.C.",
    "Wellington",
    "Windhoek",
    "Yaoundé",
    "Yaren",
    "Zagreb"
]

// Fonctions 
// Récupération de la(des) valeur(s) de l'input
function getCity(event) {
    event.preventDefault();
    let cities = cityInput.value.split(",");
    cities.forEach(city => getWeatherData(city.trim()));
    cityInput.value = "";
}

// Récupération des informations à propos de la(des) ville(s) choisie(s)
async function getWeatherData(city) {
    let dataFetch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    let data = await dataFetch.json();
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    displayWeather(city, latitude, longitude);
}

// Création et affichage de l'HTML pour les infos de météo
function displayWeather(city, lat, lon) {
    let weatherFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    weatherFetch.then((response) => response.json())
        .then((data) => {
            console.log(data);
            let dataArray = data.list;
            let cityDiv = document.createElement('div');
            cityDiv.setAttribute("class", "cityCard");
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

            for (let i = 0; i < dataArray.length; i += 8){
                temperatureData.push({ min: temperatureByDay[j].min, max: temperatureByDay[j].max });
                labels.push(temperatureByDay[j].date);

                let icon = dataArray[i].weather[0].icon;
                let weatherDiv = document.createElement('div');
                weatherDiv.setAttribute("class", "dayCard");
                weatherDiv.innerHTML = `${temperatureByDay[j].date}:<br>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="icon"><br>
                Weather: ${dataArray[i].weather[0].description}<br> 
                Temperature min: ${temperatureByDay[j].min}°C<br>
                Temperature max: ${temperatureByDay[j].max}°C<br>
                Humidity: ${dataArray[i].main.humidity}%<br>
                Pressure: ${dataArray[i].main.pressure}Pa<br>
                Wind speed: ${dataArray[i].wind.speed}Km/h`;
                j++;
                cityDiv.appendChild(weatherDiv);
            }
            createChart(city, temperatureData, labels);
        })
}

// Création du graphique des température min et max
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

/* Fonction d'auto-complétion 
Merci https://www.w3schools.com/howto/howto_js_autocomplete.asp */
function autocomplete(inp, arr) {
    let currentFocus;
  
    // Gère l'événement "input" lorsque l'utilisateur écrit dans le champ de texte.
    function handleInput(e) {
        let val = this.value;
        closeAllLists();
        if(!val) { 
            return false;
        }
        currentFocus = -1;
        let a = createAutocompleteContainer();
        for(let i = 0; i < arr.length; i++) {
            if (startsWith(arr[i], val)) {
                let b = createAutocompleteItem(arr[i], val);
                b.addEventListener("click", handleItemClick);
                a.appendChild(b);
            }
        }
    }
  
    // Gère l'événement "keydown" lorsque l'utilisateur appuie sur une touche du clavier.
    function handleKeyDown(e) {
        let x = getAutocompleteItems();
        if(e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        }else if(e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        }else if(e.keyCode == 13) {
            e.preventDefault();
        if(currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
      }
    }
  
    // Gère l'événement "click" lorsque l'utilisateur clique sur le document.
    function handleClick(e) {
        closeAllLists(e.target);
    }
  
    // Crée et retourne un élément div pour contenir les éléments de l'autocomplétion.
    function createAutocompleteContainer() {
        let a = document.createElement("div");
        a.setAttribute("id", inp.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        inp.parentNode.appendChild(a);
        return a;
    }
  
    // Crée et retourne un élément div pour chaque élément correspondant de l'autocomplétion.
    function createAutocompleteItem(item, val) {
        let b = document.createElement("div");
        b.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>";
        b.innerHTML += item.substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + item + "'>";
        return b;
    }
  
    // Gère l'événement "click" lorsqu'un élément d'autocomplétion est cliqué.
    function handleItemClick(e) {
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
    }
  
    // Ajoute la classe "autocomplete-active" à l'élément actuellement sélectionné.
    function addActive(x) {
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
  
    // Supprime la classe "autocomplete-active" de tous les éléments d'autocomplétion
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
  
    // Ferme toutes les listes d'autocomplétion dans le document, sauf celle passée en argument.
    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    // Vérifie si une chaîne commence par les mêmes lettres que la valeur du champ de texte, sans tenir compte de la casse.
    function startsWith(str, val) {
        return str.substr(0, val.length).toUpperCase() == val.toUpperCase();
    }

    // Récupère tous les éléments d'autocomplétion.
    function getAutocompleteItems() {
        let x = document.getElementById(inp.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        return x;
    }

    // Evenement
    inp.addEventListener("input", handleInput);
    inp.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
}
  
// Appels de fonctions
autocomplete(document.getElementById("cityInput"), cities);

// Evenements
weatherForm.addEventListener('submit', getCity);