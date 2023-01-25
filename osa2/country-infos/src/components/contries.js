const CountryList = ({countries, changeFilter}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length === 1) {
    const c = countries[0]
    return (
    <div>
        <h2>{c.name.common}</h2>
        <p>
        capital {c.capital[0]}
        <br/>
        area {c.area}
        </p>
        <h4>languages:</h4>
        <ul>
        {Object.values(c.languages).map(l => <li>{l}</li>)}
        </ul>
        <img src={c.flags.png} alt=""></img>
    </div>
    )
  }
  return (
    <div>
        {countries.map(c => <p>{c.name.common}<button onClick={() => changeFilter(c.name.common)}>show</button></p>)}
    </div>
  )
}

export default CountryList