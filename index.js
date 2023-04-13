const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

const { eventsDb, ticketsDb } = require('./db')

const { eventsRouter } = require('./routes/events')
const { ticketsRouter } = require('./routes/tickets')
const { userRouter } = require('./routes/user')



const { events } = require('./events.json')


// function createTickets(eventId, amountOfTickets) {
//     const tickets = []
//     for (let i = 0; i < amountOfTickets; i++) {
//         tickets.push({
//             eventId: eventId,
//             ticketId: i + 1,
//             redeemed: ""
//         })
//     }
//     return tickets
// }


// async function insert(eventId, amountOfTickets) {
//     const tickets = createTickets(eventId, amountOfTickets)
//     await ticketsDb.insert({ eventId: eventId, tickets: tickets })
// }

// insert(1, 250)
// insert(2, 3)
// insert(3, 120)
// insert(4, 200)




app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/user', userRouter)


app.listen(PORT, () => {
    console.log(`Started server at port ${PORT}`)
})