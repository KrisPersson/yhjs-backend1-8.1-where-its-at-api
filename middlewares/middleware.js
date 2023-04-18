const jwt = require('jsonwebtoken')
const { secret } = require('../bcrypt')

async function verifyToken(request, response, next) {
    const token = request.headers.authorization.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, secret)
        next()
    } catch (error) {
        response.status(401).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { verifyToken }
