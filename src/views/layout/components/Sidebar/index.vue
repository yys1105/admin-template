<script>
  import { mapGetters } from 'vuex'
  import ScrollBar from '@/components/ScrollBar'
  import SidebarItem from './SidebarItem'
  export default {
    name: '',
    components: {
      ScrollBar,
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>


<style scoped>

</style>
