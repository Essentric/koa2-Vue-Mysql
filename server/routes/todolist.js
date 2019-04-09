const todolist = require('../controllers/todolist.js')
const router = require('koa-router')()

router.post('/createTodolist', todolist.createTodolist)
router.get('/getTodolist/:id', todolist.getTodolist)
router.delete('/deleteTodoList', todolist.removeTodolist)
router.put('/updateTodolist', todolist.updateTodolist)

module.exports = router // 导出router规则
