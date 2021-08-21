const router = require('express-promise-router')()

const { check, validationResult } = require('express-validator')
const Post = require('../models/Post.schema')
const User = require('../models/User.schema')
const auth = require('../middleware/auth')

// create post (POST)
router.post('/', [
    
    auth,
    check('text', 'Text is required').not().isEmpty()

    ], async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const user = await User.findById(req.user.id).select('-password')

            
            // to create Post, we need user, text, name, avatar
            // text is obtained from req.body
            // user, text, avatar can be obtained from user from the
            // database (hence why we did User.findById)

            const newPost = new Post({
                user: user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            })

            await newPost.save()

            // return created post
            res.json(newPost)

        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
    }
)

// get all posts (GET)
router.get('/', async (req, res) => {
    try {

        const posts = await Post
            .find()
            .sort({ date: -1 }) // sorts by most recent

        res.send(posts)

    } catch (err) {

        console.error(err.message)
        return res.status(500).send('Server Error')

    }
})

// get post by ID (GET)
router.get('/:id', async (req, res) => {
    try {
        
        const post = await Post
            .findById(req.params.id)
        
        if (!post) {
            return res.status(404).send({ msg: 'Post Not Found '})
        }

        res.json(post)

    } catch (err) {

        console.error(err.message)
        
        // if the id is not a valid ObjectID, then we wanna make sure that we still console the message Post Not Found so that's why we have this if statement
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Post Not Found' })
        }

        return res.json(500).send('Server Error')

    }
})

// delete post (DELETE)
router.delete('/:id', auth, async (req, res) => {
    try {

        // check if post exists
        const post = await Post
            .findById(req.params.id)
        
        if (!post) {
            return res.status(404).send({ msg: 'Post Not Found' })
        }

        // check if post to be deleted belongs to user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove()

        res.send(post)

    } catch (err) {

        console.error(err.message)
        
        // if the id is not a valid ObjectID, then we wanna make sure that we still console the message Post Not Found so that's why we have this if statement
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Post Not Found' })
        }

        return res.status(500).send('Server Error')

    }
})

// like a post (PUT)
router.put('/like/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)
        
        // if (post.likes.filter(like => like.user.toString() === req.user.id) > 0) {
        //     return res.status(400).json({ msg: 'Post already liked' });
        // }
        
        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})

// unlike a post (PUT)
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)
        
        // if (post.likes.filter(like => like.user.toString() === req.user.id) === 0) {
        //     return res.status(400).json({ msg: 'Post has not yet been liked' });
        // }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        
        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})

// create comment (POST)
router.post('/comment/:id', 
    [
        auth,
        check('text', 'Text is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {

        try {
            
            // check if there are any errors from the validator
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // retrieve the user (because we need it for the Post Model)
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            // create a post object from the Post model!!
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };

            post.comments.unshift(newComment);

            await post.save();

            res.send(post.comments);


        } catch(err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }

    }
);

// delete a comment (DELETE)
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {   
        const post = await Post
            .findById(req.params.id);
            
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: 'No comment found' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1);

        await post.save()

        res.json(post.comments);

    } catch(err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post Not Found' });
        }
        return res.status(500).send('Server Error');        
    }
});

module.exports = router;