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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
})