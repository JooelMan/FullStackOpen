import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/contries'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => setCountries(response.data))
    }, [filter])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const filterCountries = (
    countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  )

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div>
      find countries 
      <input value={filter} onChange={onFilterChange} />
      <CountryList countries={filterCountries} changeFilter={changeFilter} />
    </div>
  )
}

export default App;
