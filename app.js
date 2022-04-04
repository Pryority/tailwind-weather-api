const apiKey = "85b2f1bdec6377177c781dc904257b09";
let apiURL;
let cityName = "Tokyo";
let forecastLength = 5;
let lat = 44;
let long = -81;

var currentLocation = $('#current-location');
var currentTemp = $('#current-temp');
var currentWind = $('#current-wind');
var currentHumidity = $('#current-humidity');

var cityInput = document.getElementById('city-input');
var searchBtn = document.getElementById('search');
var button = $('#city');

const city = {
    'toronto': {
        'location': {
            'lat': "43.6532",
            'long': "79.3832",
        }
    },
    'montreal': {
        'location': {
            'lat': 40.7128,
            'long': 74.0060,
        }
    },
    'vancouver': {
        'location': {
            'lat': 40.7128,
            'long': 74.0060,
        }
    },
    'new york city': {
        'location': {
            'lat': 40.7128,
            'long': 74.0060,
        }
    },
    'tokyo': {
        'location': {
            'lat': 40.7128,
            'long': 74.0060,
        }
    },
}

var getWeather = (city) => {
    apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
        + lat + "&lon="
        + long + "&units=metric&appid=85b2f1bdec6377177c781dc904257b09";

    // make a get request to url
    fetch(apiURL).then((response) => {
        // request was successful
        if (response.ok && city) {
            response.json().then((data) => {
                console.log('Request is OK')
                console.log(data)
                displayWeather(data)
            });
        }
        else {
            console.log(response);
            console.log("There was a problem with your request!");
        }
    });
};

var displayWeather = (forecast) => {
    for (var i = 0; i < forecastLength; i++) {
        var temperature = forecast.list[i].main.temp;
        var wind = forecast.list[i].wind.speed;
        var humidity = forecast.list[i].main.humidity;
        var forecastDate = forecast.list[i].dt_txt;
        // var uv_index = list[i].main.humidity;

        currentLocation.textContent = forecast.city.name;
        currentTemp.textContent = forecast.list[0].main.temp;
        currentWind.textContent = forecast.list[0].wind.speed;
        currentHumidity.textContent = forecast.list[0].main.humidity;

        var forecastRowEl = document.createElement('div');
        forecastRowEl.classList = 'grid grid-cols-5 gap-2';

        // create forecast card div
        var forecastCardEl = document.createElement("div");
        forecastCardEl.setAttribute('id', "forecast-card");
        forecastCardEl.classList = "container flex-col";

        var forecastCardDivEl = document.createElement('div');
        forecastCardDivEl.classList = 'bg-indigo-400 rounded';

        var forecastDateTextEl = document.createElement('p');
        forecastDateTextEl.setAttribute('id', 'forecast-date');
        forecastDateTextEl.classList = "font-bold";
        forecastDateTextEl.textContent = forecastDate;
        forecastCardDivEl.appendChild(forecastDateTextEl);

        // create temperature element to hold temp data
        var tempTextEl = document.createElement('p');
        tempTextEl.setAttribute('id', "temp");
        tempTextEl.classList = "font-semibold flex justify-between";
        tempTextEl.textContent = "Temp:";
        var tempSpanEl = document.createElement('span');
        tempSpanEl.setAttribute('id', "temp-data");
        tempSpanEl.classList = "px-2 font-bold";
        tempSpanEl.textContent = temperature + "ºC";
        tempTextEl.appendChild(tempSpanEl);
        forecastCardDivEl.appendChild(tempTextEl);

        // create wind element to hold wind data
        var windTextEl = document.createElement('p');
        windTextEl.setAttribute('id', "wind");
        windTextEl.classList = "font-semibold flex justify-between";
        windTextEl.textContent = "Wind:"
        var windSpanEl = document.createElement('span');
        windSpanEl.setAttribute('id', "wind-data");
        windSpanEl.classList = "px-2 font-bold";
        windSpanEl.textContent = wind + " km/h";
        windTextEl.appendChild(windSpanEl);
        forecastCardDivEl.appendChild(windTextEl);

        // create humidity element to hold humidity data
        var humidityTextEl = document.createElement('p');
        humidityTextEl.setAttribute('id', "humidity");
        humidityTextEl.classList = "font-semibold flex justify-between";
        humidityTextEl.textContent = "Humidity:"
        var humiditySpanEl = document.createElement('span');
        humiditySpanEl.setAttribute('id', "humidity-data");
        humiditySpanEl.classList = "px-2 font-bold";
        humiditySpanEl.textContent = humidity;
        humidityTextEl.appendChild(humiditySpanEl);
        forecastCardDivEl.appendChild(humidityTextEl);

        // append inner html elements to forecast wrapper
        forecastCardEl.appendChild(forecastCardDivEl);
        forecastRowEl.appendChild(forecastCardEl);
    }
};


var getCity = (cityName) => {
    if (!cityInput.value) {
        console.log('Need a city to search.')
    }
    else {
        // cityName = cityInput.value;
        console.log('Fetching weather data for:', cityName);
        getWeather(cityName);
    }
};

// searchBtn.addEventListener('click', getCity);

getWeather(cityName);
// button.on('click', button, () => {
//     console.log(button.textContent);
// });

