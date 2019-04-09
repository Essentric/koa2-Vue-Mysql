const Sequelize = require('sequelize') // 引入sequelize

// database, username, password
const Todolist = new Sequelize('todolist', 'root', '1010', {
  dialect: 'mysql',
  port: 3000,
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = { Todolist }// 将Todolist暴露出接口方便Model调用
