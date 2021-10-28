<template>
  <div class="playController">
    <div
      class="left"
      @click="
        isShowPlay = true;updataLyric();$emit('isPaused')
      "
    >
      <img :src="playlist[playCurrentIndex].al.picUrl" />
      <div class="songDetail">
        <div class="name">{{ playlist[playCurrentIndex].name }}</div>
        <div class="songWords">左右滑动切换</div>
      </div>
    </div>
    <div class="right">
      <svg v-show="isPaused" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-show="!isPaused" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
      <playMusic v-show="isShowPlay" :isPaused="isPaused" :play="play" :currentTime="currentTime" @back="isShowPlay = false"></playMusic>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import playMusic from './playMusic.vue'

export default {
  data() {
    return {
      isPaused: true,
      isShowPlay: false,
      currentTime: 0,
      IntervalId: ''
    }
  },
  components: {
    playMusic
  },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex'])
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.isPaused = false
        this.getCurrentTime()
      } else {
        this.$refs.audio.pause()
        this.isPaused = true
        clearInterval(this.IntervalId)
      }
    },
    updataLyric() {
      this.$store.dispatch('getLyric', { id: this.playlist[this.playCurrentIndex].id })
    },
    getCurrentTime() {
      this.IntervalId = setInterval(() => {
        this.currentTime = this.$refs.audio.currentTime
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.IntervalId)
  }
}
</script>

<style lang="less" scoped>
.playController {
  width: 7.5rem;
  height: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #000;
  background-color: rgb(231, 220, 220);
  padding: 0 0.3rem 0 0.2rem;
  margin: auto;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .songDetail {
      margin-left: 0.2rem;
      .songWords {
        font-size: 0.2rem;
        color: rgb(145, 139, 138);
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .icon:nth-child(-n + 2) {
      margin-right: 0.4rem;
      width: 0.6rem;
      height: 0.6rem;
      cursor: pointer;
    }
  }
}
</style>
