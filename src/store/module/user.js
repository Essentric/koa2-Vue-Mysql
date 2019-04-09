import http from '@/utils/axios'

const state = {
  user: JSON.parse(window.sessionStorage.getItem('user')) || {},
  token: window.sessionStorage.getItem('todolist-token') || false
}

const mutations = {
  SetToken (state, token) {
    state.token = token
    window.sessionStorage.setItem('todolist-token', token)
  },
  SetUser (state, user = {}) {
    state.user = user
    window.sessionStorage.setItem('user', JSON.stringify((user)))
  }
}

const actions = {
  Login ({ commit }, params) {
    return new Promise((resolve, reject) => {
      http.post('/auth/user', params)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.data ? res.data.data.token : false
            commit('SetToken', token)
            commit('SetUser', res.data.data)
            resolve(res)
          }
        }, ({ res }) => {
          reject(res)
        })
    })
  },
  Logout (state) {
    window.sessionStorage.removeItem('todolist-token')
    window.sessionStorage.removeItem('user')
    state.token = false
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
