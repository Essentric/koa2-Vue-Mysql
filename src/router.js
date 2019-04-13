import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todolist',
      meta: { auth: true, title: 'todolist' },
      component: () => import('./views/ToDoList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('todolist-token')
  // console.log(token)
  if (!token && to.name !== 'login') {
    // 未登录且要跳转的页面不是登录页
    next({
      name: 'login' // 跳转到登录页
    })
  } else if (!token && to.name === 'login') {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === 'login') {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'todolist' // 跳转到home页
    })
  } else {
    next()
  }
})

export default router
