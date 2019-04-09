const db = require('../config/db')

const TodolistDb = db.Todolist // 引入数据库

const List = TodolistDb.import('../schema/list.js')

// 查
const getTodoListById = async (id) => { // 获取某个用户的全部todolist
  const toDoList = await List.findAll({ // 查找全部的todolist
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status']
  })
  return toDoList
}

// 增
const createTodolist = async (data) => { // 给某个用户创建一条todolist
  const result = await List.create({
    user_id: data.userId, // 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status
  })
  return result
}

// 改
const updateTodoList = async (id, user_id, status) => {
  const result = await List.update({
    status
  }, {
    where: {
      id,
      user_id
    }
  })
  return result
}

// 删
const removeTodoList = async (id, user_id) => {
  const result = await List.destroy({
    where: {
      id,
      user_id
    }
  })
  return result
}

module.exports = {
  getTodoListById,
  createTodolist,
  updateTodoList,
  removeTodoList
}
