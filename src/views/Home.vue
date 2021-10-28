<template>
  <div class="home">
    <topNav></topNav>
    <swiperCom></swiperCom>
    <iconList></iconList>
    <musicList></musicList>
    <playController></playController>
  </div>
</template>

<script>
import topNav from '../components/topNav.vue'
import swiperCom from '../components/swiperCom.vue'
import iconList from '../components/iconList.vue'
import musicList from '../components/musicList.vue'
import playController from '../components/playController'

export default {
  name: 'Home',
  components: {
    topNav,
    swiperCom,
    iconList,
    musicList,
    playController
  },
  
}
</script>

<style lang="less" scoped>
</style>
