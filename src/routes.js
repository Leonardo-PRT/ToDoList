const express = require('express')
// const index = require('./views/index.html')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json("Hello World")
})

module.exports = routes
