const Koa = require('koa')
const auth = require('./server/routes/auth')
const todolist = require('./server/routes/todolist.js')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const jwt = require('koa-jwt')
const path = require('path')
const serve = require('koa-static')

const app = new Koa()

app.use(async (ctx, next) => {
  const start = +new Date()

  await next()

  const end = +new Date()

  console.log(ctx.url, ctx.method, end - start)
})

app.use(bodyParser())

// 静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('dist')))

router.use('/auth', auth.routes()) // 将 auth 路由挂载到 router 上并添加 auth 前缀
router.use('/api', jwt({ secret: 'todolist-token' }), todolist.routes())

app.use(router.routes()) // 将所有路由挂载到 app 实例上

app.on('error', (err, ctx) => console.log(`server error: ${err}`))

app.listen(8888, () => console.log('app is running...'))
