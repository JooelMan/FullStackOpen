const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Proffa",
    number: "0404044444"
  },
  {
    id: 2,
    name: "Keke",
    number: "1234567890"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  console.log(date);
  res.send(`<p>Phonebook has info for 2 people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
})