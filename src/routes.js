const express = require('express')
const routes = express.Router()

const TodoListController = require('./controllers/TodoListController') 

routes.get('/', (req, res) => {
    return res.json('Hello World!!')
})


routes.post('/todo_list', TodoListController.createTask)



module.exports = routes