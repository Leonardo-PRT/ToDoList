const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const Todo_list = require('../models/Todo_list')

const connection = new Sequelize(dbconfig)

Todo_list.init(connection)

module.exports = connection
