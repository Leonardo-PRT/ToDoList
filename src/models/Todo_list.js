const { Model, DataTypes } = require('sequelize')

class Todo_list extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            completed: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'todo_list'
        })
    }
}

module.exports = Todo_list