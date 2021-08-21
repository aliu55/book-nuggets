const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config/keys')

const app = express();

// connect to database 
mongoose.connect(config.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});

// body parser middleware
app.use(express.json({extended : false}));

// cors
app.use(cors());

// import and use routers
const authRouter = require('./routes/auth.router');
const postsRouter = require('./routes/posts.router');
const booksRouter = require('./routes/books.router');
const usersRouter = require('./routes/users.router');

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/books', booksRouter)

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));