const Filter = ({ v, oc }) => {
    return (
      <div>
        filter shown with <input value={v} onChange={oc} />
      </div>
    )
  }
  
  const PersonForm = ({nameV, nameOC, numberV, numberOC, submitOC }) => {
    return (
      <form>
        <div>
          name: <input value={nameV} onChange={nameOC} />
        </div>
        <div>
          number: <input value={numberV} onChange={numberOC} />
        </div>
        <div>
          <button type="submit" onClick={submitOC}>add</button>
        </div>
      </form>
    )
  }
  
  const Person = ({ name, number}) => <p>{name} {number}</p>
  
  const Numbers = ({ persons, filter }) => {
    const f = filter.toLowerCase()
    const filtered = persons.filter(p => p.name.toLowerCase().includes(f))
    return (
      <>
        {filtered.map(p =>
          <Person key={p.name} name={p.name} number={p.number} />
        )}
      </>
    )
  }

  export { Filter, Numbers, PersonForm }