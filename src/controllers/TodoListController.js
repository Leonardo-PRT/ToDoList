const Todo_list = require('../models/Todo_list')  

module.exports = {
    async createTask(req, res) {
        const {name} = req.body
        const task = await Todo_list.create({ name })

        if(!task.name) return res.status(404).json({erro: 'Want to insert a name to the task! '})

        return res.json(task)
    },

    async deleteTask(req, res) {
        const { id } = req.params
        
        const task = await Todo_list.findByPk(id)

        if(!task) return res.status(404).json({erro: 'Task not found! '})

        await Todo_list.destroy({
            where: {
                id: task.id
            }
        })

        return res.json(task)
    },

    async updateTask(req, res){
        const { id } = req.params
        const { name, completed } = req.body

        

        const task = await Todo_list.update({name: name, completed: completed},
            {
                where: { id: id }
            })

        if(!task) return res.status(404).json({erro: 'Task not found! '})

        const find = await Todo_list.findAll({
            where: {id: id}
        })

        return res.json(find)
    
    },

    async updateAll(req, res){
        const task = await Todo_list.findAll({
            where: {completed: false}
        })
        if (task.length != 0) {
            const completedTask = await Todo_list.update({completed: true}, {
                where: {completed: false}
            })
            return res.json(completedTask)
        }else{
            const activeTask = await Todo_list.update({completed: false}, {
                where: {completed: true}
            })
            return res.json(activeTask)
        }


    },

    async listAll(req, res) {
        const task = await Todo_list.findAll()
        // const not_checked = await Todo_list.findAll({ where: { completed: false}})
        
        // if(!task) return res.status(404).json({erro: 'Task not found! '})

        return res.json(task)
    },

    async listCompleted(req, res) {
        const task = await Todo_list.findAll({
            where: {
                completed: true
            }
        })
        if(!task) return res.status(404).json({erro: 'Task not found! '})

        return res.json(task)

    },
    
    async listActive(req, res) {
        const task = await Todo_list.findAll({
            where: {
                completed: false
            }
        })
        if(!task) return res.status(404).json({erro: 'Task not found! '})

        return res.json(task)

    },

    async deleteCompleted(req, res) {
        const task = await Todo_list.destroy({
            where: {
                completed: true
            }
        })

        if(!task) return res.status(404).json({erro: 'Task not found! '})

        return res.json(task)
    }

}