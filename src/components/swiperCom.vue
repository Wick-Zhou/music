<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in bannerArr" :key="index"><img :src="item.pic"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'

// import axios from 'axios'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        // Some Swiper option/callback...
        autoplay:true
      },
      bannerArr:[]
    }
  },
  methods: {
    async getBanner() {
      const res = await this.$http.get('banner?type=1')
      // console.log(res)
      this.bannerArr=res.data.banners
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {
    this.getBanner()
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 7rem;
  // height: 3rem;
  border-radius: 0.3rem;
  margin-top: 0.3rem;
}
img{
  width: 100%;
}
</style>
