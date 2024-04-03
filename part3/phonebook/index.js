const express = require('express')

const app = express()

const morgan = require('morgan')

require('dotenv').config()

const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('dist'))

app.use(express.json())

app.use(cors())

morgan.token('body', req => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const getAll = app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})
const persons = []
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if (persons.find(person => person.name === body.name)) {
    updatePerson
    return
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

const updatePerson = app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
updatePerson
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(person => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) { response.json(person) } else { response.status(404).end() }
    })
    .catch(error => next(error))
})

getAll

app.get('/info', (request, response) => {
  const count = getAll.length
  const now = new Date()
  response.send(`<p>Phonebook has info for ${count} people</p><p>${now}</p>`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
