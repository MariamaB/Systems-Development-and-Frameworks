const jwt = require('jsonwebtoken')

function decode(token) {
    return (token != undefined) ? jwt.verify(token, "supersecret") : null;
}


module.exports = decode;