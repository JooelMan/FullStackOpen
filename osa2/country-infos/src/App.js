import { useState, useEffect } from 'react'
import { CountryList, Weather } from './components/contries'
import { getAllCountries, getWeather } from './services/filterService'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ city, setCity ] = useState('')
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then(response => setCountries(response.data))
    }, [filter])

  useEffect(() => {
    getWeather(city)
      .then(response => setWeather(response.data))
      .catch(error => {})
  }, [city])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const filterCountries = (
    countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  )

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const changeCity = (newCity) => {
    setCity(newCity)
  }

  return (
    <div>
      find countries 
      <input value={filter} onChange={onFilterChange} />
      <CountryList countries={filterCountries} changeFilter={changeFilter} changeCity={changeCity} />
      <Weather city={city} weather={weather} />
    </div>
  )
}

export default App;
