<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'
  import Screenfull from '@/components/Screenfull'
  import ModifyPwd from './ModifyPwd'

  export default {
    name: '',
    components: {
      Hamburger,
      Breadcrumb,
      Screenfull,
      ModifyPwd
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(res => {
          this.$router.push({ name: 'login' })
        })
      },
      modifyPwd() {
        this.dialogVisible = true
      },
      changeVisible(val) {
        this.dialogVisible = val
      }
    }
  }
</script>

<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
             首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="modifyPwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <modify-pwd :visible.sync="dialogVisible" @change-visible="changeVisible"></modify-pwd>
    </div>
  </el-menu>
</template>


<style scoped lang="scss">
  .navbar{
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
