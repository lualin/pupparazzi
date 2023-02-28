// const { Router } = require('express')
// const express = require('express')
// const hbs = require('express-handlebars')
// const fsPromises = require('fs').promises
// const puppies = require('./data/data.json')

// const server = express()

// // Router variables
// const homeRouter = express.Router()

// // Server configuration
// const publicFolder = __dirname + '/public'
// const viewFolder = __dirname + '/views'
// server.use(express.static(publicFolder))
// server.use(express.urlencoded({ extended: false }))

// // Handlebars configuration
// server.engine('hbs', hbs.engine({ extname: 'hbs' }))
// server.set('view engine', 'hbs')
// server.set('views', __dirname + '/views')

// // Your routes/router(s) should go here
// homeRouter.get('/', (req, res) => {
//   let filename = viewFolder + '/home'
//   res.render(filename, (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(`Sent: ${filename} \n '/' router working`)
//       res.end()
//     }
//   })
// })

// // Server use router

// server.use(homeRouter)

// module.exports = server
// module.exports = { Router }

const express = require('express')
const hbs = require('express-handlebars')
const puppiesData = require('./data/data.json')

const server = express()
// const router = express.Router()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  //   const viewData = JSON.parse(JSON.stringify(puppiesData))
  //   const puppies = {
  //     id: viewData.puppies.id,
  //     name: viewData.puppies.name,
  //     image: viewData.puppies.image,
  //   }
  res.render('home', puppiesData)
})

module.exports = server
