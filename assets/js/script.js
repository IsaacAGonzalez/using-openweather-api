const todayBox = document.querySelector('#weatherToday');
const futureBox = document.querySelector('#weatherNext');
const startBtn = document.querySelector('#getWeatherBtn');
const searchList = document.querySelector('#searchList');
const DateTime = luxon.DateTime;
const APIkey = '9963e00355fdacd31b6ee8d960ed782b';
let city = document.querySelector('#city').value;
let searchHistory = [];
let cityInfo;
let currentWeather;
let forecastWeather;




let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function writeCurrent(today) {
  let template = `
    <h1>${today.name} (${DateTime.fromSeconds(today.dt).toLocaleString('D')}) <img src="http://openweathermap.org/img/w/${today.weather[0].icon}.png"><h1>
    <ul>
      <li>Temp: ${today.main.temp} °F</li>
      <li>Wind: ${today.wind.speed} MPH</li>
      <li>Humidity: ${today.main.humidity} %</li>
    </ul>
  `;
  todayBox.innerHTML = template;
  if (!searchHistory.includes(today.name)) {
    searchHistory.push(today.name)
  }
  let searchTemplate = ``;
  for (let i = 0; i < searchHistory.length; i++) {
    searchTemplate += `
      <button type="button" class="btn btn-primary" type="button">${searchHistory[i]}</button>
    `;
  }
  searchList.innerHTML = searchTemplate;
}

function writeForecast(future) {
  let template = `
    <h2>5-Day Forecast:</h2>
    <div class="list-group list-group-horizontal">
      <li class="list-group-item">
        <p>${DateTime.fromSeconds(future.list[3].dt).toLocaleString('D')}</p>
        <img src="http://openweathermap.org/img/w/${future.list[3].weather[0].icon}.png">
        <ul>
          <li>Temp: ${future.list[3].main.temp} °F</li>
          <li>Wind: ${future.list[3].wind.speed} MPH</li>
          <li>Humidity: ${future.list[3].main.humidity} %</li>
        </ul>
      </li>
      
      <li class="list-group-item">
        <p>${DateTime.fromSeconds(future.list[11].dt).toLocaleString('D')}</p>
        <img src="http://openweathermap.org/img/w/${future.list[11].weather[0].icon}.png">
        <ul>
          <li>Temp: ${future.list[11].main.temp} °F</li>
          <li>Wind: ${future.list[11].wind.speed} MPH</li>
          <li>Humidity: ${future.list[11].main.humidity} %</li>
        </ul>
      </li>

      <li class="list-group-item">
        <p>${DateTime.fromSeconds(future.list[19].dt).toLocaleString('D')}</p>
        <img src="http://openweathermap.org/img/w/${future.list[19].weather[0].icon}.png">
        <ul>
          <li>Temp: ${future.list[19].main.temp} °F</li>
          <li>Wind: ${future.list[19].wind.speed} MPH</li>
          <li>Humidity: ${future.list[19].main.humidity} %</li>
        </ul>
      </li>

      <li class="list-group-item">
        <p>${DateTime.fromSeconds(future.list[27].dt).toLocaleString('D')}</p>
        <img src="http://openweathermap.org/img/w/${future.list[27].weather[0].icon}.png">
        <ul>
          <li>Temp: ${future.list[27].main.temp} °F</li>
          <li>Wind: ${future.list[27].wind.speed} MPH</li>
          <li>Humidity: ${future.list[27].main.humidity} %</li>
        </ul>
      </li>

      <li class="list-group-item">
        <p>${DateTime.fromSeconds(future.list[35].dt).toLocaleString('D')}</p>
        <img src="http://openweathermap.org/img/w/${future.list[35].weather[0].icon}.png">
        <ul>
          <li>Temp: ${future.list[35].main.temp} °F</li>
          <li>Wind: ${future.list[35].wind.speed} MPH</li>
          <li>Humidity: ${future.list[35].main.humidity} %</li>
        </ul>
      </li>
    </div>
  `;
  futureBox.innerHTML = template;
}

function weatherFetch(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`)
    .then(response => response.text())
    .then(result => { cityInfo = JSON.parse(result) })
    .then(() => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&units=imperial&appid=${APIkey}`)
        .then(response => response.text())
        .then(result => {
          currentWeather = JSON.parse(result);
          console.log(currentWeather);
          writeCurrent(currentWeather);
        })
        .catch(error => console.log('error', error));
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&units=imperial&appid=${APIkey}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          forecastWeather = JSON.parse(result);
          console.log(forecastWeather);
          writeForecast(forecastWeather);
        })
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
}



startBtn.addEventListener('click', function () {
  city = document.querySelector('#city').value;
  weatherFetch(city);
});



searchList.addEventListener('click', function (event) {
  city = event.target.innerText;
  weatherFetch(city);
});