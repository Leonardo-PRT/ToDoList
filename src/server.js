const express = require('express')
const routes = require('./routes')

require('./database/index')

const app =  express()

app.use(express.json())
app.use(routes)
app.set('view engine', 'html')


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(3333, () => {
    console.log('Executando o servidor na porta: 3333')
})