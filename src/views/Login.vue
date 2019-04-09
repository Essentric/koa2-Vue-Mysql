<template>
  <i-row class="content">
    <i-col :xs="24" :sm="{span: 4,offset: 10}">
      <span class="title">
        欢迎登录
      </span>
      <i-row>
        <i-col>
          <i-input
            v-model="user.username"
            placeholder="账号"
            type="text">
          </i-input>
        </i-col>
        <i-col>
          <i-input
            v-model="user.password"
            placeholder="密码"
            type="password"
            @keyup.enter.native="onLogin">
          </i-input>
        </i-col>
        <i-col>
          <i-button long :loading="loading" type="primary" @click="onLogin">登录</i-button>
        </i-col>
      </i-row>
    </i-col>
  </i-row>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: 'Essentric',
        password: '123'
      },
      loading: false
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    onLogin () {
      this.loading = true
      this.$store.dispatch('user/Login', this.user)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$notice.success({ title: res.data.msg })
            this.$router.push({ name: 'todolist' })
          } else {
            this.$notice.info({ title: res.data.msg })
          }
        }, ({ res }) => {
          console.log(res)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .content {
    padding: 16px;
  }
  .title {
    font-size: 28px;
  }
  .ivu-input {
    margin: 12px 0;
  }
  .ivu-button {
    width: 100%;
    margin-top: 12px;
  }
</style>
