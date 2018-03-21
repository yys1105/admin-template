<script>
  import { Message } from 'element-ui'
  export default {
    name: '',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码长度不得少于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        passwordType: 'password',
        loading: false,
        loginRules: {
          username: [{ required: true, trigger: 'blur', message: '请输入登录名' }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        }
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ name: 'dashboard' })
            }).catch(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>

<template>
  <div class="login-container">
    <el-form class="login-form" :rules="loginRules" :model="loginForm" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="登录名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button type="primary" style="width: 100%;margin-bottom: 30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>


<style lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 86%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 225, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
<style scoped lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0 auto 40px auto;
        text-align: center;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
