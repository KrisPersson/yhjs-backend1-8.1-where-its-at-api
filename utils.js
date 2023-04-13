const { events } = require('./events.json')


function getEvent(eventId) {
    for (let i = 0; i < events.length; i++) {
        if (eventId == events[i].id) {
            return events[i]
        }
    }
    return
}

function createTickets(eventId, amountOfTickets) {
    const tickets = []
    for (let i = 0; i < amountOfTickets; i++) {
        tickets.push({
            eventId: eventId,
            ticketId: i + 1,
            redeemed: "",
            isBought: false
        })
    }
    return tickets
}

async function insert(eventId, amountOfTickets) {
    const tickets = createTickets(eventId, amountOfTickets)
    await ticketsDb.insert({ eventId: eventId, tickets: tickets })
}

// insert(1, 250)
// insert(2, 80)
// insert(3, 120)
// insert(4, 200)

module.exports = { getEvent }