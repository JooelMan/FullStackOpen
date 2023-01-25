import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({countries}) => {
  console.log(countries);
  
  return (
    <ul>
      {countries.map(c => <li>{c.name.common}</li>)}
    </ul>
  )
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => setCountries(response.data))
    }, [filter])

  const onFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }
  
  const filterCountries = (
    countries.filter(c => c.name.common.toLowerCase().includes(filter))
  )

  return (
    <div>
      find countries 
      <input value={filter} onChange={onFilterChange} />
      <CountryList countries={filterCountries} />
    </div>
  )
}

export default App;
