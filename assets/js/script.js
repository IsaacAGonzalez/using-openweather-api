const todayBox = document.querySelector('#weatherToday');
const futureBox = document.querySelector('#weatherNext');
const startBtn = document.querySelector('#getWeatherBtn');
const APIkey = '9963e00355fdacd31b6ee8d960ed782b';
let city = 'San Diego';
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
  <h1>${today.name}<h1>
  `;
  template += today.weather.main
}

function writeForecast(future) {
  let template = ``;
}

startBtn.addEventListener('click', function () {
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
});




