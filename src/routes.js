const express = require('express')
const routes = express.Router()

const TodoListController = require('./controllers/TodoListController')

routes.get('/', (req, res) => {
    
    return res.json('Hello World!!')
})


routes.post('/todo_list', TodoListController.createTask)
routes.post('/completed', TodoListController.listCompleted)
routes.post('/active', TodoListController.listActive)
routes.post('/', TodoListController.listAll)

routes.delete('/delete/:id', TodoListController.deleteTask)
routes.delete('/', TodoListController.deleteCompleted)


routes.put('/:id', TodoListController.updateTask)





module.exports = routes