const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = 'mongodb+srv://makspodg77:ksfOcnn1700enZTh@cluster0.nnherhy.mongodb.net/phonebookApp?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        const phoneNumberPattern = /^(?:\d{2,3}-\d+)$/
        return phoneNumberPattern.test(v)
      }
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
