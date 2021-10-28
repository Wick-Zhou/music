<template>
  <div class="topNav">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-liebiao2"></use>
    </svg>
    <div class="centerNav">
      <span @click="$router.push('/user')">我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <svg class="icon" aria-hidden="true" @click="$router.push('/searchview')">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name:'topNav'
}
</script>

<style lang="less" scoped>
  .topNav{
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.5rem;
    height: 0.7rem;
    padding: 0 0.1rem;

    .centerNav{
      width: 5rem;
      display: flex;
      justify-content: space-around;
    }
  }
</style>
