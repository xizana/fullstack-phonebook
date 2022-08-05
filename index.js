const { request, response } = require('express')
const express = require('express')
const app = express()

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.use(express.json())

// this is main page

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// i have to add persons lenght 
// and also date

app.get('/api/info', (req, res) => {
  res.send(`<h2>Phonebook has info for ${persons.length} people</h2>`)
  // res.send(`<h2>${persons.date}</h2>`)
})




const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// this route get person info with ID
// if ID didn't exists ==> status code 404

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// morgan

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})