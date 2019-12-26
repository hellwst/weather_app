const API_KEY = '89a6e20f6592b6aeeebfeeb6b1a16947';
const ROOT_URL = ``;

// Zmienne z elementami DOM
const searchInput = document.getElementById("js_search-input");
const searchButton = document.getElementById("js_search-btn");
const searchResults = document.querySelector(".results__header");
const errorMsg = document.getElementById("js_error-msg");
const instruction = document.getElementById("js_instruction");
const weatherIcon = document.getElementById("js_current-weather-icon");
const resultsWrapper = document.getElementById("js_results");
const dataTemp = document.getElementById("js_current_weather_temp");
const dataTempFeel = document.getElementById("js_current_weather_tempfeel");
const loaderElement = document.getElementById("js_loader");
const dataPressure = document.getElementById("js_current_weather_pressure");
//const dataRain = document.getElementById("js_current_weather_rainsum");
const dataCloudiness = document.getElementById("js_current_weather_cloudiness");
const dataWindSpeed = document.getElementById("js_current_weather_windspeed");
const dataHumidity = document.getElementById("js_current_weather_humidity");
searchButton.addEventListener("click", handleSearch);

function getWeather(city) {
    // utwórz url
    const urlLink = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    // schowaj instrukcję
    instruction.classList.remove("show");
    // schowaj informację o błędach
    errorMsg.classList.remove("show");
    // pokaż loader
    loaderElement.classList.add("show");
    axios.get(urlLink)
        .then(res => {
            console.log(res);
            handleResponse(res.data.list);
        })
        .catch (e => {
            handleError();
            console.error (e);
        });
    }
function handleError() {
    // pokaż error
    errorMsg.classList.add("show");
    // schowaj loader
    loaderElement.classList.remove("show");
}

function handleResponse(list) {
    resultsWrapper.classList.add("show");
    // pokaż aktualną pogodę
    showCurrentWeather(list);
    loaderElement.classList.remove("show");
    // pokaż prognozę pogody
    showForecast(list);
}

function showCurrentWeather(list) {
    const current = list[0];
    const icon = current.weather[0].icon;
    const temp = current.main.temp;
    const tempFeel = current.main.feels_like;
    const pressure = current.main.pressure;
    //const rain = current.rain['3h'];
    const cloudiness = current.clouds.all;
    const wind = current.wind.speed;
    const humidity = current.main.humidity;
    // pobierz kod ikony i ustaw ją jako src obrazka
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    searchResults.textContent = `Aktualna pogoda: ${current.dt_txt}`;
    dataTemp.textContent = `${Math.round(temp)}\xB0C`;
    dataTempFeel.textContent = `${Math.round(tempFeel)}\xB0C`;
    dataPressure.textContent = `${pressure} hPa`;
    //dataRain.textContent = `${rain} mm`;
    dataCloudiness.textContent = `${cloudiness}%`;
    dataWindSpeed.textContent = `${Math.round(wind * 3.6)} km/h`;
    dataHumidity.textContent = `${humidity}%`
}

function showForecast(list) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const dt_txtValue = [];
    const tempList = [];
    list.forEach(function(el) {
        dt_txtValue.push(el.dt_txt);
        tempList.push(Math.round(el.main.temp));
    });
    // wykres z danymi w canvas
    var chart = new Chart(ctx, {
    // Rodzaj wykresu, który chcemy stworzyć
    type: 'line',

    data: {
        labels: dt_txtValue,
        datasets: [{
            label: 'Temperatura',
            backgroundColor: 'rgb(80, 131, 204)',
            borderColor: 'rgb(223, 86, 90)',
            data: tempList
        }]
    },

    // Opcje konfiguracyjne
    options: {}
});
}

function handleSearch() {
    // pobierz nazwę miasta z pola input
    const text = searchInput.value;
    if (text) {
    // wywołaj funkcję getWeather z nazwą miasta
        getWeather (text);
    }
}

function addListenerToSearchButton() {
    // pobierz element button z formularza
    var searchButton = document.getElementById("js_search-btn");
    // dodaj do elementu button funkcję handleSearch na evencie 'click'
    searchButton.addEventListener("click", handleSearch);
}

// wywołaj funkcję addListenerToSearchButton

addListenerToSearchButton();
