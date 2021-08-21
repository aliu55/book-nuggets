const router = require('express-promise-router')()
const config = require('config')

const { check, validationResult } = require('express-validator')
const User = require('../models/User.schema')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// create user (POST)
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            
            const {
                name,
                email,
                password
            } = req.body;

            console.log(req.body)

            // 1. check if user already exists
            let user = await User.findOne({ email })
            
            if (user) {
                console.log('user already exists')
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            // 2. get user's gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            // and create a new user if user does not exist
            user = User({
                name,
                email,
                password,
                avatar
            })

            // 3. hash (encyrpt) password with salt
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            // 4. sign jsonwebtoken and return token

            // after we created a user (from doing user.save()) a unique id will be automatically generated that belongs to the user, that's why user.id in the following would work
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get("JWT_SECRET"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

        }
        
        catch (err) {
            console.error(err.message)
            return res.status(500).send('Status Error')
        }

    }
)


module.exports = router