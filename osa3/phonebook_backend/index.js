const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

const generateID = () => {
  min = 0
  max = 1000
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body);
  
  
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ 
      error: 'name already in use' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }

  persons = persons.concat(person)

  res.json(person)
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