const $temp = document.querySelector('.temp');
const $location = document.querySelector('.location');

const getWeather = async () => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=37&lon=127&exclude=minutely,hourly&appid=bbc6e8234ed4d84e32cc1c299b69a505&units=Metric');
  $temp.textContent = `${data.current.temp}°`;
  $location.textContent = data.timezone;
}

document.addEventListener('DOMContentLoaded', getWeather);
