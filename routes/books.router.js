const router = require('express-promise-router')()

const Book = require('../models/Book.schema')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// create book (POST)
router.post('/', [
    auth,
    check('title', 'Book title required').not().isEmpty(),
    ], async (req, res) => {
        
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).send({ msg: errors.array() })
    }

    try {

        const title = req.body.title.toLowerCase()

        let book = await Book.findOne({ title });
        
        if (book && book.user.toString() === req.user.id) {
            return res.status(400).json({ errors: [{ msg: 'Book already exists' }] });
        }

        const user = await User
            .findById(req.user.id)
            .select('-password')
        
        book = new Book({
            user: user.id,
            title: title,
        })

        await book.save()

        res.send(book)

    } catch (err) {
        
        console.error(err.message)
        return res.status(500).send({ msg: 'Server Error' })

    }
        
    }
)

// get all books by a specific user (GET)
router.get('/', auth, async (req, res) => {
    try {

        const books = await Book
            .find({ user: req.user.id })
            .sort({ date: -1 }) // sorts by most recent
        
        if (!books) {
            return res.status(404).json({ msg: 'No books found for this user' })
        }
            
        res.send(books)

    } catch (err) {
        
        console.error(err.message)
        return res.status(500).send({ msg: 'Server Error' })
        
    }
})

// get book by ID (GET)
router.get('/:id', auth, async (req, res) => {
    try {

        const book = await Book
            .findById(req.params.id)
        
        if (!book) {
            return res.status(404).send({ msg: 'Book Not Found' })
        }

        res.send(book)

    } catch (err) {

        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Book Not Found' })
        }

        return res.status(500).send({ msg: 'Server Error' })
    }
})

// create note for a book (POST)
router.post('/notes/:book_id',
    [
        auth,
        check('type', 'Type is required').not().isEmpty(),
        check('text', 'Text is required').not().isEmpty(),
    ], async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {

            const book = await Book.findById(req.params.book_id)

            const newNote = {
                type: req.body.type,
                text: req.body.text,
            }

            book.notes.unshift(newNote)

            await book.save()

            res.send(book.notes)

        } catch (err) {
            
            console.error(err.message)
            return res.status(500).send('Server Error')

        }
})

// delete book (DELETE)
router.delete('/:book_id', auth, async (req, res) => {
    try {

        // check if book exists
        const book = await Book.findById(req.params.book_id)

        if (!book) {
            return res.status(404).send({ msg: 'Book not found '})
        }

        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized '})
        }

        await book.remove()

        res.send(book)

    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Post Not Found' })
        }

        return res.status(500).send('Server Error')
    }
})

// delete note for a book (DELETE)
router.delete('/notes/:book_id/:note_id', auth, async (req, res) => {
    try {
        
        const book = await Book.findById(req.params.book_id)
        const note = await book.notes.find(note => note.id === req.params.note_id)
        
        if (!note) {
            return res.status(404).json({ msg: 'No note found '})
        }

        const removeIndex = book.notes.map(note => note._id.toString()).indexOf(req.params.note_id)

        book.notes.splice(removeIndex, 1)

        await book.save()

        res.json(book.notes)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})

module.exports = router