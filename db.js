const nedb = require('nedb-promises')
const userDb = new nedb({ filename: 'userDb.db', autoload: true })
const ticketsDb = new nedb({ filename: 'ticketsDb.db', autoload: true })
const eventsDb = new nedb({ filename: 'eventsDb.db', autoload: true })
const apiKeysDb = new nedb({ filename: 'apiKeysDb.db', autoload: true })





module.exports = { userDb, ticketsDb, eventsDb, apiKeysDb }
