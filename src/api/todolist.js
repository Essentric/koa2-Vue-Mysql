import Axios from '@/utils/axios'

export default {
  getList (id) {
    return Axios.get(`/api/getTodolist/${id}`)
  },
  update (data) {
    return Axios.put('/api/updateTodolist', data)
  },
  create (data) {
    return Axios.post('/api/createTodolist', data)
  },
  delete (data) {
    return Axios.delete('/api/deleteTodolist', { data })
  }
}
