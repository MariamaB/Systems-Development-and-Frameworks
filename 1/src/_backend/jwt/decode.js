const jwt = require('jsonwebtoken')
const CONFIG = require('./config')

function decode(token) {

    // console.log(jwt.verify(token, "supersecret"));
    return (token) ? jwt.verify(token, CONFIG.JWT_SECRET) : null;
}


module.exports = decode;