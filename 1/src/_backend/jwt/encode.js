const jwt = require('jsonwebtoken')
const CONFIG = require('./config')

//import jwt from 'jsonwebtoken'
//import CONFIG from './config'

// Generate an Access Token for the given User ID
function encode(user) {
    delete user.password
    const token = jwt.sign(user, CONFIG.JWT_SECRET, {
        expiresIn: '1d',
        issuer: CONFIG.GRAPHQL_URI,
        audience: CONFIG.CLIENT_URI,
        subject: user.email.toString(),
    })
    // jwt.verifySignature(token, CONFIG.JWT_SECRET, (err, data) => {
    //   console.log('token verification:', err, data)
    // })
    console.log(token)
    return token
}

module.exports = encode;