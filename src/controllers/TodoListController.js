const Todo_list = require('../models/Todo_list')  

module.exports = {
    async createTask(req, res) {
        const completed = true
        const {name} = req.body
        const task = await Todo_list.create({name, completed})

        return res.json(task)
    }

}