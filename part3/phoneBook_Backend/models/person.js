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
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Name required']
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{1,}$/.test(v);
            },
            message: props => `${props.value} does not match the number format!`
        },
        required: [true, 'Phone number required']
    }
})

personSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)