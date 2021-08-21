const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('config')
const MONGO_URI = config.get('MONGO_URI')

const app = express();

// connect to database 
mongoose.connect(MONGO_URI, {
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

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));