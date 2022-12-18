var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');


const loginRouter = require('./routes/login')
const bandRouter = require('./routes/band')
const albumRouter = require('./routes/album')
const songRouter = require('./routes/song')
const performRouter = require('./routes/perform')
const fanRouter= require('./routes/fan')
const aboutMeRouter = require('./routes/aboutMe')

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use('/api',loginRouter)
app.use('/api',bandRouter)
app.use('/api',albumRouter)
app.use('/api',songRouter)
app.use('/api',performRouter)
app.use('/api',fanRouter)
app.use('/api',aboutMeRouter)

module.exports = app;
