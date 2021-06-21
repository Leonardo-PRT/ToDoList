const express = require('express')
const routes = require('./routes')
const path = require('path')


require('./database/index')

const app =  express()

app.use(express.static("public"))
app.use(express.json())
app.use(routes)
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(8888, () => {
    console.log('Server running')
})
