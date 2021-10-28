<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    if (window.localStorage.userData) {
      let userData = JSON.parse(window.localStorage.userData)
      // console.log(userData);
      this.$store.commit('USERLOGIN', userData)
      
    }
  }
}
</script>

<style lang="less"></style>
