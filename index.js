require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Port has been started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()



