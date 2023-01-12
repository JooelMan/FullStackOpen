import { useState } from 'react'

const Person = ({ name }) => <p>{name}</p>

const Numbers = ({ persons }) => {
  return (
    <>
      {persons.map(p =>
        <Person key={p.name} name={p.name} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewName = (event) => {
    event.preventDefault()
    const newNameObj = { name: newName }
    setPersons(persons.concat(newNameObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App