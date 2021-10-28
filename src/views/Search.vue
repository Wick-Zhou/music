<template>
  <div class="searchView">
    <div class="searchTopNav">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <input type="text" :placeholder="placeholder" v-model="keyWord" @keydown.enter="saveKeyWord" />
    </div>
    <div class="history" v-show="searchSongList.length==0">
      <span>历史</span>
      <ul>
        <li v-for="(item, index) in keyWordList" :key="index" ref="historySearch" @click="historySearch">{{ item }}</li>
      </ul>
    </div>
    <div class="playList" v-show="searchSongList.length!==0">
      <div class="playListTop">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span class="playAll">播放全部</span>
          <span class="allCount">(共{{ searchSongList.length }}首)</span>
        </div>
      </div>
      <div class="songList">
        <div class="songItem" v-for="(item, index) in searchSongList" :key="item.id">
          <div class="left">
            <div class="number">{{ index + 1 }}</div>
            <div class="song" @click="searchPlay(item)">
              <div class="songName">{{ item.name }}</div>
              <div class="songDetail">
                <span v-for="(item2, index2) in item.ar" :key="index2">
                  {{ item2.name }}
                  <span v-if="index2 < item.ar.length - 1">/</span>
                </span>
                - {{ item.al.name }}
              </div>
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

export default {
  components:{
    playController
  },
  data() {
    return {
      placeholder: '林俊杰',
      keyWord: '',
      keyWordList: [],
      searchSongList:[]
    }
  },
  methods: {
    async saveKeyWord() {
      if (this.keyWord.trim()) {
        // 调用搜索接口
        const res = await this.$http.get(`cloudsearch?keywords= ${this.keyWord}`)
        console.log(res)
        this.searchSongList=res.data.result.songs
        // 判断搜索历史中是否有
        if (this.keyWordList.indexOf(this.keyWord) == '-1') {
          this.keyWordList.unshift(this.keyWord)
          if(this.keyWordList.length>10){
            this.keyWordList=this.keyWordList.slice(0,10)
          }
          window.localStorage.keyWordList = JSON.stringify(this.keyWordList)
        }
        else{
          // 当搜索历史中有时 把这条记录放在第一
          this.keyWordList.splice(this.keyWordList.indexOf(this.keyWord),1)
          this.keyWordList.unshift(this.keyWord)
          if(this.keyWordList.length>10){
            this.keyWordList=this.keyWordList.slice(0,10)
          }
          window.localStorage.keyWordList = JSON.stringify(this.keyWordList)
        }
        this.keyWord = ''
      }
    },
    async historySearch(e){
      // console.log(e.target.innerText);
      let historyKeyWord=e.target.innerText
      const res = await this.$http.get(`cloudsearch?keywords= ${historyKeyWord}`)
      this.searchSongList=res.data.result.songs
    },
    searchPlay(item){
      this.$store.commit('pushPlayList',item)
      this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
    }
  },
  beforeMount() {
    // if (window.localStorage.keyWordList) {
    //   this.keyWordList = JSON.parse(window.localStorage.keyWordList)
    // }else{
    //   this.keyWordList = []
    // }

    this.keyWordList = window.localStorage.keyWordList ? JSON.parse(window.localStorage.keyWordList) : []
  }
}
</script>

<style lang="less" scoped>
.searchView {
  width: 7.5rem;
  .searchTopNav {
    padding: 0 0.3rem;
    // width: 7.5rem;
    height: 1rem;
    display: flex;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #666;
      margin-left: 0.5rem;
      // width: 100%;
      height: 0.7rem;
      padding-right: 0.4rem;
    }
  }
  .history {
    padding: 0 0.3rem;
    display: flex;
    // align-items: center;
    span {
      // width: 0.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-weight: 900;
      margin-right: 0.4rem;
    }
    ul {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        // width: 100%;
        height: 0.5rem;
        padding: 0 0.2rem;
        background-color: #eee;
        border-radius: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.25rem;
        margin: 0.1rem 0.1rem;
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
}
</style>
