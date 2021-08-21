const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token')

    // check if there is a token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'))

        // this sets the user field in request (req.user) to the user in the token
        // now if we ever want the user's id we can be access it in ANY protected route via req.user.id
        req.user = decoded.user

        next()

    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }
}


module.exports = auth

// for any requests that uses this auth
// middleware, make sure to pass the token
// in the Headers (key as x-auth-token and value
// as the token) in those requests 