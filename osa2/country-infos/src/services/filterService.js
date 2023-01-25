import axios from 'axios'

const getFilteredCountries = () => {
  axios
    .get(`https://restcountries.com/v3.1/all`)
    .then(response => {
      
    })
}

export default { getFilteredCountries }