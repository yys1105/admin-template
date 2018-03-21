<script>
  import { mapGetters } from 'vuex'
  import Sidebar from './components/Sidebar'
  import AppMain from './components/AppMain'
  import Navbar from './components/Navbar'
  import TagsView from './components/TagsView'
  export default {
    name: '',
    components: {
      Sidebar,
      AppMain,
      Navbar,
      TagsView
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    }
  }
</script>

<template>
  <div class="app-wrapper" :class="{hideSidebar: !sidebar.opened}">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>


<style scoped lang="scss">
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
