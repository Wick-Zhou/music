<template>
  <div class="playMusic">
    <div class="bg">
      <img :src="playlist[playCurrentIndex].al.picUrl" />
    </div>
    <div class="playTop">
      <svg class="icon" aria-hidden="true" @click="$emit('back')">
        <use xlink:href="#icon-xiangxia"></use>
      </svg>
      <div class="center">
        <div class="title">
          <marquee behavior="srcoll" direction="left" loop="-1">{{ playlist[playCurrentIndex].al.name }}</marquee>
        </div>
        <div class="author">
          {{ playlist[playCurrentIndex].ar[0].name }}
        </div>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang-copy"></use>
      </svg>
    </div>
    <div class="playContent" v-show="isLyric">
      <img src="../assets/images/needle-ab.png" class="citou" :class="{ active: !isPaused }" />
      <img src="../assets/images/disc-plus.png" class="diepian" />
      <img :src="playlist[playCurrentIndex].al.picUrl" class="songPic" :class="{ picActive: !isPaused }" />
    </div>
    <div class="playLyric" v-show="!isLyric" ref="playLyric">
      <p v-for="(item, index) in lyricCut" :key="index" :class="{ active: item.nextLyricTime >= currentTime && item.time <= currentTime }">
        {{ item.context }}
      </p>
    </div>
    <div class="progress"></div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon pause" aria-hidden="true" v-show="isPaused" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon play" aria-hidden="true" v-show="!isPaused" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['isPaused', 'play', 'currentTime'],
  data() {
    return {
      isLyric: false
    }
  },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex']),
    ...mapGetters(['lyricCut'])
  },
  // watch: {
  //   currentTime(newvalue){
  //     let p=document.querySelector('p.active')
  //     this.$refs.playLyric.scrollTop=p.offsetTop
  //   }
  // },
  methods: {
    goPlay(num){
      let index=this.playCurrentIndex+num
      if(index<0){
        index=this.playlist.length-1
      }else if(index==this.playlist.length){
        index=0
      }
      this.$store.commit('setPlayIndex',index)
      this.$store.dispatch('getLyric',{ id: this.playlist[this.playCurrentIndex].id })
    }
  },
}
</script>

<style lang="less" scoped>
.playMusic {
  width: 7.5rem;
  height: 100vh;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;

  .bg {
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      filter: blur(60px);
      background-size: auto 100%;
      z-index: -1;
    }
  }
  .playTop {
    width: 7.5rem;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 0.2rem;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
      fill: #fff;
    }
    .center {
      .title {
        marquee {
          width: 3rem;
          font-size: 0.4rem;
        }
      }
      .author {
        text-align: center;
      }
    }
  }
  .playContent {
    width: 7.5rem;
    height: 9rem;
    position: relative;
    padding-top: 0.5rem;
    .citou {
      position: absolute;
      width: 2.2rem;
      right: 1.5rem;
      transform: rotate(-10deg);
      z-index: 5;
      transform-origin: 0 0;
      transition: all 1s;
    }
    .active {
      transform: rotate(10deg);
    }
    .diepian {
      position: absolute;
      width: 6rem;
      left: calc(50% - 3rem);
      top: 3rem;
    }
    .songPic {
      position: absolute;
      top: 4.2rem;
      left: calc(50% - 1.8rem);
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 1.8rem;
    }
    .picActive {
      // transform: rotate(360deg);
      // transition: all 5s;
      @-webkit-keyframes rotation {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }
      transform: rotate(360deg);
      animation: rotation 4s linear infinite;
      -moz-animation: rotation 4s linear infinite;
      -webkit-animation: rotation 4s linear infinite;
      -o-animation: rotation 4s linear infinite;
    }
  }
  .playLyric {
    width: 7.5rem;
    text-align: center;
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    overflow: scroll;
    color: #fff;
    display: flex;
    flex-direction: column;
    .active {
      color: red;
    }
  }
  .playFooter {
    display: flex;
    width: 100%;
    height: 1.5rem;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0;
    .icon {
      fill: #fff;
    }
    .play,
    .pause {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
