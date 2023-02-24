require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person.js')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//const generateID = () => {
//  min = 0
//  max = 1000
//  return Math.floor(Math.random() * (max - min + 1) + min)
//}

let persons = []

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body);
  
  
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  //if (persons.find(p => p.name === body.name)) {
  //  return res.status(400).json({ error: 'name already in use' })
  //}

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)  
  persons = persons.filter(p => p.id !== id)
  
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for 2 people</p><p>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})