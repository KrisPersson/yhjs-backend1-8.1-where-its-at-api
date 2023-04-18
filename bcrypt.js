const bcrypt = require('bcrypt')
const saltRounds = 10
const secret = 'yesbox'

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds)
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, comparePassword, secret }
