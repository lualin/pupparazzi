const express = require('express')
const hbs = require('express-handlebars')
const puppiesRoute = require('./routes')
const puppies = require('./data/data.json')

const app = express()
module.exports = app

// Server configuration
const publicFolder = __dirname + '/public'
app.use(express.static(publicFolder))
app.use(express.urlencoded({ extended: false }))

// Handlebars configuration
app.engine('hbs', hbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Use puppies router for /puppies/:id route
app.use('/puppies', puppiesRoute)

// Home route
app.get('/', async (req, res) => {
  await res.render('home', puppies)
})
