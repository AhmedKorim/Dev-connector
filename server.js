const express = require('express');
const mongoose = require('mongoose');

// routes files
const user = require('./routes/api/user');
const post = require('./routes/api/post');
const prfile = require('./routes/api/prfile');
const bodyParser = require('body-parser');
// starting the app
const db = require('./config/keys').mongoURI;
// connect to db
mongoose.connect(db)
    .then(db => console.log('data base connected'))
    .catch(err => console.log(err));


const app = express();
// middleware
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}))

// routes
app.use('/api/users',user);
app.use('/api/profile',prfile);
app.use('/api/posts',post);

app.get('/', (req, res, next) => {
    res.send('hello')
})

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);

    console.log('server is running at ' + port + "\n http://localhost:" + port);
})