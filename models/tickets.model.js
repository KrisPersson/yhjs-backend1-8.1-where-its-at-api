const { ticketsDb, apiKeysDb } = require('../db')
const moment = require('moment')



async function getAllTickets(eventId) {
    return await ticketsDb.findOne({ eventId: eventId })
}

async function getSpecificTicket(eventId, ticketId) {
    const { tickets } = await ticketsDb.findOne({ eventId: Number(eventId) })
    if (!tickets) {
        throw new Error("No event matches this event id")
    }
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].ticketId === Number(ticketId)) {
            return tickets[i]
        }
    }
    throw new Error('No matching ticket number for this event')
}

async function verifyTicket(apiKey, ticketId, eventId) {
    const apiKeyIsAMatch = await apiKeysDb.find({ apiKey: apiKey })
    if (apiKeyIsAMatch.length < 1) {
        throw new Error('No matching API-key')
    }
    const ticket = await getSpecificTicket(eventId, ticketId)
    if (ticket.redeemed) {
        throw new Error('Ticket has already been redeemed')
    }
    // if (!ticket.isBought) {
    //     throw new Error('This ticket was not purchased and can not be redeemed')
    // }

    const { tickets } = await ticketsDb.findOne({ eventId: Number(eventId) })
    const newTickets = []

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].ticketId === Number(ticketId)) {
            const updatedTicket = {...tickets[i], redeemed: moment().format() }
            newTickets.push(updatedTicket)
        } else {
            newTickets.push(tickets[i])
        }
    }

    const update = await ticketsDb.update({ eventId: Number(eventId) }, { $set: { tickets: [...newTickets] } })
    if (update == 0) {
        throw new Error('Could not verify ticket - database error')
    }
    return await getSpecificTicket(eventId, ticketId)
}

async function purchaseTicket(eventId, requestedAmountOfTickets, apiKey) {
    const ticketAvailable = await areTicketsStillAvailable(eventId, requestedAmountOfTickets)
    if (!ticketAvailable) {
        throw new Error('Not enough available tickets left to complete this order')
    }

    const requestedTicketsFromDb = await getTicketsFromDb(eventId, requestedAmountOfTickets)
    const { tickets } = await getAllTickets(Number(eventId))
    
    const newTickets = []

    tickets.forEach(ticket => {
        let newTicket = {...ticket}
        for (let i = 0; i < requestedTicketsFromDb.length; i++) {
            if (ticket.ticketId == requestedTicketsFromDb[i].ticketId) {
                newTicket = {...newTicket, buyer: apiKey}
            }
        }
        newTickets.push(newTicket)
    })


    
    const update = await ticketsDb.update({ eventId: Number(eventId) }, { $set: { tickets: [...newTickets] } })
    if (update == 0) {
        throw new Error('Could not complete purchase - database error')
    }
    return requestedTicketsFromDb
}

async function areTicketsStillAvailable(eventId, requestedAmountOfTickets) {

    const { tickets } = await ticketsDb.findOne({ eventId: Number(eventId) })
    let availableTickets = 0

    for (let i = 0; i < tickets.length; i++) {
        if (!tickets[i].hasOwnProperty('buyer')) {
            availableTickets += 1
        }
        if (availableTickets === Number(requestedAmountOfTickets)) {
            return true
        }
    }
    return false
}

async function getTicketsFromDb(eventId, requestedAmountOfTickets) {
    const { tickets } = await ticketsDb.findOne({ eventId: Number(eventId) })
    const requestedTickets = []

    for (let i = 0; i < tickets.length; i++) {
        if (!tickets[i].hasOwnProperty('buyer')) {
            requestedTickets.push(tickets[i])
        }
        if (requestedTickets.length === Number(requestedAmountOfTickets)) {
            return requestedTickets
        }
    }
    throw new Error('Not enough tickets - database error')
}

module.exports = { getAllTickets, getSpecificTicket, verifyTicket, purchaseTicket }
