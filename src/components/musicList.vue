<template>
  <div class="musicList">
    <div class="header">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicListItem">
      <div class="swiper-container" id="musicSwiper">
        <div class="swiper-wrapper">
          <router-link :to="{ path: '/listview', query: { id: item.id } }" class="swiper-slide" v-for="item in musicList" :key="item.id">
            <img :src="item.picUrl" :alt="item.name" />
            <div class="name">{{ item.name }}</div>
            <div class="number">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
              <span>{{ formatNumber(item.playCount) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'

export default {
  data() {
    return {
      musicList: []
    }
  },
  methods: {
    async getRecMusicList() {
      const res = await this.$http.get('personalized?limit=10')
      // console.log(res)
      this.musicList = res.data.result
    },

    formatNumber(count) {
      if (count >= 100000000) {
        return (count / 100000000).toFixed(2) + '亿'
      } else if (count >= 10000) {
        return (count / 10000).toFixed(2) + '万'
      } else return count
    }
  },
  created() {
    this.getRecMusicList()
  },
  updated() {
    let swiper = new Swiper('#musicSwiper', {
      slidesPerView: 3,
      spaceBetween: 30
    })
  }
}
</script>

<style lang="less" scoped>
.musicList {
  width: 7rem;
  margin: auto;
}
.header {
  display: flex;
  justify-content: space-between;

  .title {
    font-size: 0.4rem;
    font-weight: 900;
  }
  .more {
    font-size: 0.24rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 1.2rem;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
  }
}
.musicListItem {
  margin-top: 0.3rem;
  .swiper-container {
    width: 100%;
    height: 3rem;
    .swiper-slide {
      // background-color: aqua;
      position: relative;

      img {
        width: 100%;
        border-radius: 0.3rem;
      }
      .name {
        height: 0.6rem;
        font-size: 0.2rem;
        // overflow: hidden;
        // line-height: 0.4rem;
      }
      .number {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        color: azure;
        font-size: 0.2rem;
        display: flex;
        align-items: center;
      }
      .number .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #ccc;
      }
    }
  }
}
</style>
