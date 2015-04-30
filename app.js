var express = require('express')
var path = require('path')
var favicon = require('static-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs  = require('express-handlebars')

var routes = require('./routes/index')
var users = require('./routes/users')
var posts = require('./routes/posts')

var app = express()
var hbs = exphbs.create({defaultLayout: 'main'})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hbs.engine)
app.enable('view cache')

// Register `hbs.engine` with the Express app.
app.set('view engine', 'handlebars')

app.use(favicon())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/posts', posts)
app.use('/users', users)

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})


module.exports = app
