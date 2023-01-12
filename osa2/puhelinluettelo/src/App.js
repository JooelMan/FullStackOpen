import { useState } from 'react'
import { Filter, PersonForm, Numbers } from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewNumber = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    const newNameObj = { name: newName, number: newNumber }
    setPersons(persons.concat(newNameObj))
    setNewName('')
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter v={filter} oc={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        nameV={newName} nameOC={handleNameChange}
        numberV={newNumber} numberOC={handleNumberChange}
        submitOC={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} />
    </div>
  )

}

export default App