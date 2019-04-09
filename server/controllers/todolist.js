const todolist = require('../models/todolist.js')

const getTodolist = async (ctx) => { // 获取某个用户的所有todolist
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await todolist.getTodoListById(id)
  ctx.body = {
    success: true,
    msg: '获取成功',
    data: result
  } // 将请求的结果放到response的body里返回
}

const createTodolist = async (ctx) => { // 给某个用户创建一条todolist
  const data = ctx.request.body // post请求，数据是在request.body里的
  const result = await todolist.createTodolist(data)
  ctx.body = {
    success: true,
    msg: '创建成功'
  }
}

const removeTodolist = async (ctx) => {
  const { id, user_id } = ctx.request.body
  const result = await todolist.removeTodoList(id, user_id)
  ctx.body = {
    data: result,
    success: result === 0 ? false : true,
    msg: `${result === 0 ? '删除失败' : '删除成功'}`
  }
}

const updateTodolist = async (ctx) => {
  let { id, user_id, status } = ctx.request.body
  status = !status
  const result = await todolist.updateTodoList(id, user_id, status)
  ctx.body = {
    success: true,
    msg: '操作成功',
    data: result
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
