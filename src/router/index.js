import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
//在development-env中不使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。所以只有在生产中使用延迟加载;

Vue.use(Router)

export const  constantRouterMap = [
  { path: '/login', name: 'login' ,component: _import('login/index'), hidden: true },
  {
    path: '',
    redirect: '/',
    component: Layout,
    hidden: true,
    children: [{
      path: '/',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    meta: { icon: 'user' },
    children: [{
      path: 'index',
      name: 'adminManagement',
      component: _import('admin/index'),
      meta: { title: '管理员管理', icon: 'user' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    meta: { icon: 'user' },
    children: [{
      path: 'index',
      name: 'userManagement',
      component: _import('user/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
