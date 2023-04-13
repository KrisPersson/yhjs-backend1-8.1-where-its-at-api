const { nanoid } = require('nanoid')
const { userDb, apiKeysDb } = require('../db')

async function registerNewUser(username, password) {

    const userNameAlreadyExists = await userDb.findOne({ username })
    if (userNameAlreadyExists) {
        throw new Error('Username already exists')
    }
    const newUser = {
        username: username,
        password: password,
        apiKey: nanoid()
    }
    const addedUser = await userDb.insert(newUser)
    console.log(addedUser)
    if (!addedUser) {
        throw new Error('Failed to add user in database')
    }
    await apiKeysDb.insert({ apiKey: newUser.apiKey })
    return { username: addedUser.username, apiKey: addedUser.apiKey }
}

async function userLogin(username, password) {
    const user = await userDb.findOne({ username })
    if (!user) {
        throw new Error('Username not found')
    }
    if (password !== user.password) {
        throw new Error('Wrong password')
    }
    return { username: user.username, apiKey: user.apiKey }
}

module.exports = { registerNewUser, userLogin }
