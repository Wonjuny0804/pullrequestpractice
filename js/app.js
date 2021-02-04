import location from './location.js';

let weatherState = JSON.parse(localStorage.getItem('weatherState'));

const $temp = document.querySelector('.temp');
const $location = document.querySelector('.location');

const $weatherModal = document.querySelector('.weather-modal');
const $modalLocation = document.querySelector('.weather-modal .location');
const $modalWeatherState = document.querySelector('.weather-state');
const $modalWetherIcon = document.querySelector('.weather-modal .weather-icon');
const $modalTemp = document.querySelector('.modal-temp');
const $weeklyWeatherList = document.querySelector('.weekly-weather');

const render = () => {
  $temp.textContent = `${Math.floor(weatherState.current.temp)}°`;
  $location.textContent = weatherState.timezone;
  $modalLocation.textContent = weatherState.timezone;
  $modalWeatherState.textContent = weatherState.current.weather[0].main;
  $modalWetherIcon.src = `http://openweathermap.org/img/wn/${weatherState.current.weather[0].icon}@2x.png`;
  $modalTemp.textContent = `${Math.floor(weatherState.current.temp)}°`;

  const $fragment = document.createDocumentFragment();

  weatherState.daily.length = 7;

  weatherState.daily.forEach(dailyWeather => {
    const $li = document.createElement('li');
    const $time = document.createElement('time');
    const $img = document.createElement('img');
    const $tempMin = document.createElement('em');
    const $tempMax = document.createElement('em');
    const $span = document.createElement('span');

    const date = new Date(dailyWeather.dt * 1000);

    $time.classList.add('white-space');
    $time.dateTime = date.toISOString(); 
    $time.textContent = date.toDateString().slice(0, 3).toUpperCase();

    $img.classList.add('weather-icon');
    $img.src = `http://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`;
    $img.alt = dailyWeather.weather[0].main;

    $tempMin.classList.add('temp');
    $tempMin.classList.add('temp-min');
    $tempMin.textContent = `${Math.floor(dailyWeather.temp.min)}°`;

    $tempMax.classList.add('temp');
    $tempMax.classList.add('temp-max');
    $tempMax.textContent = `${Math.floor(dailyWeather.temp.max)}°`;

    $span.textContent = ' / ';

    // <li><time class="white-space" datetime="">THU</time><img class="weather-icon" src="http://openweathermap.org/img/wn/10d@2x.png" 
    // alt="약간 비"/><em class="temp temp-min">0°</em> / <em class="temp temp-max">7°</em></li>
    $li.appendChild($time);
    $li.appendChild($img);
    $li.appendChild($tempMin);
    $li.appendChild($span);
    $li.appendChild($tempMax);

    $fragment.appendChild($li);
  });
  $weeklyWeatherList.innerHTML = '';

    $weeklyWeatherList.appendChild($fragment);
}

const getWeather = async () => {
  const [lat, lon] = await location();
  console.log(lat, lon);
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=bbc6e8234ed4d84e32cc1c299b69a505&units=Metric`);
  
  localStorage.setItem('weatherState', JSON.stringify(data));
  localStorage.setItem('sunrise', data.current.sunrise * 1000);
  localStorage.setItem('sunset', data.current.sunset * 1000);
  render();
}

document.addEventListener('DOMContentLoaded', getWeather);

