require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGOOSE_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connection to Mongoose has been succesful');
    })
    .catch(error => {
        console.log('error connecting to MongoDB')
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)