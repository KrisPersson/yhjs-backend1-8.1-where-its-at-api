const { nanoid } = require('nanoid')
const { userDb, apiKeysDb } = require('../db')
const { hashPassword, comparePassword } = require('../bcrypt')

async function registerNewUser(username, password) {

    const userNameAlreadyExists = await userDb.findOne({ username })
    if (userNameAlreadyExists) {
        throw new Error('Username already exists')
    }

    const hashedPassword = await hashPassword(password)

    const newUser = {
        username: username,
        password: hashedPassword,
        id: nanoid(),
        apiKey: nanoid()
    }
    const addedUser = await userDb.insert(newUser)
    if (!addedUser) {
        throw new Error('Failed to add user in database - contact system administrator')
    }
    await apiKeysDb.insert({ apiKey: newUser.apiKey })
    return { username: addedUser.username, apiKey: addedUser.apiKey, id: addedUser.id }
}

async function userLogin(username, password) {
    const user = await userDb.findOne({ username })
    if (!user) {
        throw new Error('Wrong username and/or password')
    }
    const passwordIsAMatch = await comparePassword(password, user.password)
    if (!passwordIsAMatch) {
        throw new Error('Wrong username and/or password')
    }

    return { username: user.username, apiKey: user.apiKey, id: user.id }
}

module.exports = { registerNewUser, userLogin }
