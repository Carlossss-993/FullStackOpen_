require('dotenv').config()

const MONGOOSE_URI = process.env.MONGOOSE_URI
const PORT = process.env.PORT

module.exports = { MONGOOSE_URI, PORT }