<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tubiaozhizuomoban"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai1"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.iconList {
  width: 7rem;
  margin: 0.3rem auto;
  display: flex;
  justify-content: space-between;
  background-color:	#F5F5F5;
  border-radius: 0.3rem;
  padding: 0.1rem 0.2rem;

  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>
