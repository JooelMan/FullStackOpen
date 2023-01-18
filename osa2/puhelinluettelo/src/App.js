import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, PersonForm, Numbers } from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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