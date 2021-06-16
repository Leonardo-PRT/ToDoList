const express = require('express')
const routes = require('./routes')

require('./database/index')

const app =  express()

app.use(express.json())
app.use(routes)

app.listen(8000, () => {
    console.log('Executando o servidor na porta: 8000')
})