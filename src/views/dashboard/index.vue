<script>
  import { mapGetters } from 'vuex'
  export default {
    name: '',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {}
    },
    created() {
      this.$store.dispatch('GetUserInfo')
    }
  }
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎: {{ name }}</div>
  </div>
</template>


<style scoped lang="scss">
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      text-align: center;
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
