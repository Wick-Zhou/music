<template>
  <div>
    <!-- :style="`background:url(${playList.coverImgUrl}) no-repeat;background-size:100% 100%;margin:auto`" -->
    <div class="listViewTop">
      <div class="listViewNav">
        <img :src="playList.coverImgUrl" class="bgImg" />
        <div class="left">
          <svg class="icon back" aria-hidden="true" @click="goBack">
            <use xlink:href="#icon-gonggong-zuojiantou"></use>
          </svg>
          <span>歌单</span>
        </div>
        <div class="right">
          <svg class="icon search" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
          <svg class="icon more" aria-hidden="true">
            <use xlink:href="#icon-androidgengduo"></use>
          </svg>
        </div>
      </div>
      <div class="detail">
        <div class="left">
          <img :src="playList.coverImgUrl" />
          <div class="number">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
            <span>{{ formatNumber(playList.playCount) }}</span>
          </div>
        </div>
        <div class="right">
          <h3>{{ playList.name }}</h3>
          <div class="author">
            <img :src="playList.creator.avatarUrl" class="authorPic" />
            <span>{{ playList.creator.nickname }}></span>
          </div>
          <div class="description">
            {{ playList.description }}
          </div>
        </div>
      </div>
      <div class="iconList">
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun-"></use>
          </svg>
          <span>{{ playList.commentCount }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <span>{{ playList.shareCount }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
          <span>下载</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duoxuan"></use>
          </svg>
          <span>多选</span>
        </div>
      </div>
    </div>
    <div class="playList">
      <div class="playListTop">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span class="playAll">播放全部</span>
          <span class="allCount">(共{{ playList.tracks.length }}首)</span>
        </div>
        <div class="right">
          <button>+ 收藏（{{ formatNumber(playList.subscribedCount) }}）</button>
        </div>
      </div>
      <div class="songList">
        <div class="songItem" v-for="(item, index) in playList.tracks" :key="item.id">
          <div class="left">
            <div class="number">{{ index + 1 }}</div>
            <div class="song" @click="setPlayIndex(index)">
              <div class="songName">{{ item.name }}</div>

              <div class="songDetail">
                <span v-for="(item2, index2) in item.ar" :key="index2">
                  {{ item2.name }}
                  <span v-if="index2 < item.ar.length - 1">/</span>
                </span>
                - {{ item.al.name }}
              </div>
              <!-- <div class="songDetail">{{item.ar[0].name}}-{{ item.al.name }}</div> -->
            </div>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-caozuo-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-androidgengduo"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <playController></playController>
  </div>
</template>

<script>
import playController from '../components/playController.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    playController
  },
  computed: {
    ...mapState(['playCurrentIndex', 'playlist'])
  },
  data() {
    return {
      playList: {
        creator: '',
        tracks: []
      },
      listPlay: false
    }
  },
  methods: {
    async getMusicListDetail() {
      let id = this.$route.query.id
      // const res = await this.$http.get(`playlist/detail?id=${id}`)
      const res = await this.$http.get('playlist/detail', { params: { id } })
      console.log(res)
      // console.log(this.$route.query.id)
      this.playList = res.data.playlist
      this.$store.commit('setPlayList', this.playList.tracks)
    },
    formatNumber(count) {
      if (count >= 100000000) {
        return (count / 100000000).toFixed(2) + '亿'
      } else if (count >= 10000) {
        return (count / 10000).toFixed(2) + '万'
      } else return count
    },
    goBack() {
      this.$router.go(-1)
    },

    ...mapMutations(['setPlayIndex', 'GETLYRIC'])
  },
  created() {
    this.getMusicListDetail()
  }
}
</script>

<style lang="less" scoped>
.listViewTop {
  width: 7.5rem;
  margin: auto;
  .listViewNav {
    width: 7.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    .icon {
      fill: #fff;
    }

    .bgImg {
      width: 7.5rem;
      // height: auto;
      position: absolute;
      top: 0;
      z-index: -1;
      filter: blur(30px);
    }
    .left {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.3rem;

      .back {
        cursor: pointer;
      }
      span {
        margin-left: 0.5rem;
        font-size: 0.5rem;
        font-weight: 800;
        line-height: 1rem;
        color: #fff;
      }
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0.3rem;

      .search {
        margin-right: 0.5rem;
      }
    }
  }
  .detail {
    width: 7.5rem;
    display: flex;
    justify-content: space-between;
    margin: auto;
    margin-top: 0.5rem;

    .left {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      // margin-top: 0.3rem;
      margin-left: 0.3rem;
      img {
        height: 100%;
        width: 100%;
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

    .right {
      padding-right: 0.3rem;
      width: 4.2rem;
      height: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        color: #fff;
      }

      .author {
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.1rem;
        }
        span {
          color: #fff;
        }
      }
      .description {
        font-size: 0.24rem;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp: 2; //显示的行
      }
    }
  }
  .iconList {
    width: 7.5rem;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;

    .icon {
      fill: white;
      width: 0.7rem;
      height: 0.7rem;
    }

    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        color: #fff;
        margin-top: 0.15rem;
      }
    }
  }
}

.playList {
  width: 7.5rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: #fff;
  // padding: 0.3rem 0.3rem 0 0.3rem;
  margin: auto;
  margin-bottom: 1rem;

  .playListTop {
    width: 7.5rem;
    height: 1.2rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .playAll {
        margin-left: 0.3rem;
        font-size: 0.4rem;
        font-weight: 600;
      }
      .allCount {
        font-size: 0.3rem;
      }
    }

    .right {
      button {
        color: #fff;
        background-color: red;
        border: none;
        height: 0.8rem;
        border-radius: 0.4rem;
      }
    }
  }

  .songList {
    width: 7.5rem;
    margin-top: 0.2rem;
    .songItem {
      width: 7.5rem;
      height: 1.3rem;
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;

      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .number {
          width: 0.4rem;
          text-align: center;
        }
        .song {
          margin-left: 0.3rem;
          .songName {
            font-weight: 600;
          }

          .songDetail {
            font-size: 0.2rem;
          }
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon:nth-child(1) {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
