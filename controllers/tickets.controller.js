const { getSpecificTicket, verifyTicket, purchaseTicket } = require('../models/tickets.model')
const { getEvent } = require('../utils')


async function getSpecificTicketCtrl(request, response) {

    const { eventid, ticketid } = request.headers
    const ticket = await getSpecificTicket(eventid, ticketid)
    
    response.json({ success: true, ticket })
}

async function verifyTicketCtrl(request, response) {
    const { apiKey, ticketId, eventId } = request.body

    try {
        const verifiedTicket = await verifyTicket(apiKey, ticketId, eventId)
        response.json({ success: true, ticket: verifiedTicket })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }

}

async function purchaseTicketCtrl(request, response) {
    const { eventId, requestedAmountOfTickets, apiKey } = request.body
    try {
        const purchasedTickets = await purchaseTicket(eventId, requestedAmountOfTickets, apiKey)
        response.json({ success: true, purchasedTickets, event: getEvent(eventId) })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

module.exports = { getSpecificTicketCtrl, verifyTicketCtrl, purchaseTicketCtrl }
