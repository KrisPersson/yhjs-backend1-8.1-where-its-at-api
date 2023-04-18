const { registerNewUser, userLogin } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { secret } = require('../bcrypt')


async function userRegisterCtrl(request, response) {

    const { username, password } = request.body
    // console.log(request.body)

    try {
        const newUser = await registerNewUser(username, password)

        response.json({ success: true, message: "Successfully signed up!", newUser })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }

}

async function userLoginCtrl(request, response) {
    const { username, password } = request.body

    try {
        const user = await userLogin(username, password)
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 100 } )
        response.json({ 
            success: true,
            message: `Successfully logged in as ${user.username}!`, 
            username: user.username, 
            apiKey: user.apiKey,
            token: token 
        })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

async function verifyTokenCtrl(request, response) {
    const token = request.headers.authorization.replace('Bearer ', '')

    try {
        const data = jwt.verify(token, secret)
        response.json({ success: true, message: 'Token valid' })
    } catch (error) {
        response.json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { userRegisterCtrl, userLoginCtrl, verifyTokenCtrl}
