require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
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



