require('dotenv').config()
const router = require('express-promise-router')()
const config = require('../config/keys')

const auth = require('../middleware/auth')
const User = require('../models/User.schema')

// imports for validating user
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

// login user (POST)
router.post('/', 
    [
        
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()

    ], async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {

            const {
                email,
                password
            } = req.body

            console.log(req.body)

            // check if user exists 
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'User does not exist. Invalid credentials' }] })
            }

            // check if passowrd is valid
            const matched = await bcrypt.compare(password, user.password)

            if (!matched) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
            }

            // if correct credentials then return token (as jsonwebtoken)
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.JWT_SECRET,
                { expiresIn: 360000},
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Status Error')
        }

    }
)

// get user (GET)
router.get('/', auth, async(req, res) => {
    try {
        
        // the auth middleware will take care of extracting
        // the token we passed into the header along 
        // with the GET request so now we can just do req.user.id

        // find user in database via user id 
        let user = await User.findById(req.user.id).select('-password')

        // return user (but without its password)
        res.json(user)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Status Error')
    }
    
})

module.exports = router