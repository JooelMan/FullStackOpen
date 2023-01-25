const Weather = ({city, weather}) => {
  if (!city || !weather) return <></>

  return (
    <>
      <h3>Weather in {city}</h3>
      <p>temperature: {weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  )
}

const CountryInfo = ({name, capital, area}) => {
  return (
    <>
      <h2>{name}</h2>
      <p>
      capital {capital}
      <br/>
      area {area}
      </p>
    </>
  )
}

const Languages = ({languages}) => {
  return (
    <>
      <h4>languages:</h4>
      <ul>
      {Object.values(languages).map(l => <li key={l}>{l}</li>)}
      </ul>
    </>
  )
}

const CountryList = ({countries, changeFilter, changeCity}) => {
  if (countries.length > 10) {
    changeCity('')
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length === 1) {
    const c = countries[0]
    changeCity(c.capital[0])
    return (
    <div>
      <CountryInfo name={c.name.common} capital={c.capital[0]} area={c.area} />
      <Languages languages={c.languages} />
      <img src={c.flags.png} alt=""></img>
    </div>
    )
  }
  changeCity('')
  return (
    <div>
        {countries.map(c => <p>{c.name.common}<button onClick={() => changeFilter(c.name.common)}>show</button></p>)}
    </div>
  )
}

export { CountryList, Weather }