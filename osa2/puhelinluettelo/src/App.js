import { useState, useEffect } from 'react'
import { Filter, PersonForm, Numbers } from './components/Numbers'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(returnedObjs => {
        console.log('promise fulfilled')
        setPersons(returnedObjs)
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
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const newPersonObj = { ...person, number: newNumber }
        personService
          .update(person.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
      return
    }
    const newNameObj = { name: newName, number: newNumber }
    personService.create(newNameObj)
      .then(returnedObj => {
        setPersons(persons.concat(returnedObj))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setPersons(persons.filter(p => p.id !== id))
      personService.deleteFromServer(id)
    }
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
      <Numbers persons={persons} filter={filter} deleteNum={deleteNumber}/>
    </div>
  )

}

export default App