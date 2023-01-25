import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getAllCountries = () => {
  return axios.get(`https://restcountries.com/v3.1/all`)
}

const getWeather = (city) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
}

export { getAllCountries, getWeather }