require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

const mongoose = require('mongoose')
const cors = require('cors')
const todoRouter = require('./router/todoRoute')

app.get('/', (request, response) => {
    response.json({message: 'It is working'})
})

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', (errorMessage)=>{console.log(errorMessage)})
db.once('open', ()=>{console.log('Connected successfully to the database!');})

app.use(express.json())
app.use(cors())

app.use('/api/v1/todolist', todoRouter)


app.listen(PORT, console.log(`Server started running at http://localhost:${PORT}`))