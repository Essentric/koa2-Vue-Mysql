const user = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  let result = await user.getUserById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.username)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        msg: '用户名或密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.username,
        id: userInfo.id
      }
      const secret = 'todolist-token' // 指定密钥
      const token = jwt.sign(userToken, secret) // 签发token
      console.log(token)
      ctx.body = {
        success: true,
        data: {
          token, // 返回token
          ...userToken
        },
        msg: '登陆成功'
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
