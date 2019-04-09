<template>
  <i-row class="content">
    <i-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{user.name}}！你的待办事项是：
      </span>
      <i-input placeholder="请输入待办事项" v-model.trim="todos" @keyup.enter.native="addTodos"></i-input>
      <i-tabs v-model="activeName">
        <i-tab-pane label="待办事项" name="first">
          <i-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="todo-list" :key="item.id" v-if="!item.status">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <i-button size="small" type="success" @click="updateTodos(item)">完成</i-button>
                    <i-button size="small" :plain="true" type="warning" @click="removeTodos(item)">删除</i-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </i-col>
        </i-tab-pane>
        <i-tab-pane label="已完成事项" name="second">
          <template v-if="!ToDo">
            <template v-for="(item, index) in list">
              <div class="todo-list" :key="item.id" v-if="item.status">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <i-button size="small" type="primary" @click="updateTodos(item)">还原</i-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </i-tab-pane>
      </i-tabs>
    </i-col>
  </i-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ToDoList',
  data () {
    return {
      name: 'Molunerfinn',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0
    }
  },
  computed: { // 计算属性用于计算是否已经完成了所有任务
    ...mapState({
      user: state => state.user.user
    }),
    Done () {
      if (this.list.length === 0) {
        return true
      }
      return this.list.every(e => e.status === 1)
    },
    ToDo () {
      if (this.list.length === 0) {
        return true
      }
      return this.list.every(e => e.status === 0)
    }
  },
  created () {
    this.getToDoList()
  },
  methods: {
    getToDoList () {
      this.$api.todolist.getList(this.user.id)
        .then((res) => {
          if (res.data.success) {
            console.log(res)
            this.list = res.data.data
          } else {
            this.$notice.info({ title: res.data.msg })
          }
        }, ({ res }) => {
          console.log(res)
        })
    },
    addTodos () {
      if (this.todos === '') { return }
      let obj = {
        status: 0,
        content: this.todos,
        userId: this.user.id
      }
      this.$api.todolist.create(obj)
        .then((res) => {
          if (res.data.success) {
            this.$notice.success({ title: res.data.msg })
            this.getToDoList()
          }
        }, ({ res }) => {
          console.log(res)
        })
      this.todos = '' // 清空输入框
    },
    removeTodos (item) {
      const obj = { id: item.id, user_id: this.user.id }
      this.$api.todolist.delete(obj)
        .then((res) => {
          if (res.data.success) {
            this.$notice.success({ title: res.data.msg })
            this.getToDoList()
          } else {
            this.$notice.info({ title: res.data.msg })
          }
        }, ({ res }) => {
          console.log(res)
        })
    },
    updateTodos (item) {
      const obj = { id: item.id, user_id: this.user.id, status: item.status }
      this.$api.todolist.update(obj)
        .then((res) => {
          if (res.data.success) {
            this.$notice.success({ title: res.data.msg })
            this.getToDoList()
          } else {
            this.$notice.info({ title: res.data.msg })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ivu-input {
    margin: 20px auto;
  }
  .ivu-tabs /deep/ .ivu-tabs-bar {
    margin-bottom: 0;
  }
  .todo-list {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
    .item {
      font-size: 20px;
      &.finished {
        text-decoration: line-through;
        color: #ddd;
      }
    }
  }
  .pull-right {
    float: right;
  }
</style>
