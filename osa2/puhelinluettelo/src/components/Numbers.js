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
  
  const Person = ({ id, name, number, deleteNum }) => (
    <>
      <p>
        {name} {number}
        <button onClick={() => deleteNum(id, name)}>delete</button>
      </p>
    </>
  )
  
  const Numbers = ({ persons, filter, deleteNum }) => {
    const f = filter.toLowerCase()
    const filtered = persons.filter(p => p.name.toLowerCase().includes(f))
    return (
      <>
        {filtered.map(p =>
          <Person key={p.name} name={p.name} number={p.number} deleteNum={deleteNum} id={p.id} />
        )}
      </>
    )
  }

  export { Filter, Numbers, PersonForm }