import axios from 'axios'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const baseURL = 'https://api.openweathermap.org'

const getIconLink = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

const getWeather = (latlng) => {
  return axios
    .get(`${baseURL}/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${WEATHER_API_KEY}&units=metric`)
    .then(res => { 
      console.log(res.data)
      return res.data})
}

export default { getWeather, getIconLink }