const express = require('express')
const routes = express.Router()

const TodoListController = require('./controllers/TodoListController')


routes.post('/create', TodoListController.createTask)
routes.post('/completed', TodoListController.listCompleted)
routes.post('/#/active', TodoListController.listActive)
routes.get('/todo_list', TodoListController.listAll)

routes.delete('/delete/:id', TodoListController.deleteTask)
routes.delete('/', TodoListController.deleteCompleted)


routes.put('/:id', TodoListController.updateTask)
routes.put('/', TodoListController.updateAll)


module.exports = routes