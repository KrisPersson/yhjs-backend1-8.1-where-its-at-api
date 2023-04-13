const { registerNewUser, userLogin } = require('../models/user.model')

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
        response.json({ 
            success: true,
            message: `Successfully logged in as ${user.username}!`, 
            username: user.username, 
            apiKey: user.apiKey 
        })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

module.exports = { userRegisterCtrl, userLoginCtrl }
