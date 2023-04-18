const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

const { eventsDb, ticketsDb } = require('./db')

const { eventsRouter } = require('./routes/events')
const { ticketsRouter } = require('./routes/tickets')
const { userRouter } = require('./routes/user')


app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/user', userRouter)


app.listen(PORT, () => {
    console.log(`Started server at port ${PORT}`)
})
