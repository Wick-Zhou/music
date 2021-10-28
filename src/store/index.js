import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // { ar: [{ name: '' }] }
    playlist: [{
      name: '',
      id: '',
      al: {
        id: '',
        name: '',
        pic: '',
        picUrl: '',
        pic_str: ''
      },
      ar:['']
    }],
    playCurrentIndex: 0,
    lyric: '',
    user: {
      isLogin: false,
      account: {},
      userDetail:{}
    }
  },
  mutations: {
    setPlayList(state,value) {
      state.playlist=value
    },
    pushPlayList(state,value) {
      state.playlist.push(value)
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex=value
      // console.log(state.playlist[state.playCurrentIndex]);
    },
    GETLYRIC(state,value) {
      state.lyric = value
      // console.log('到了');
      // console.log(state.lyric);
    },
    USERLOGIN(state, value) {
      console.log('改了islogin');
      state.user = value
    }
  },
  actions: {
    async getLyric(context,value) {
      let res=await axios.get(`http://localhost:3000/lyric?id=${value.id}`)
      // console.log(res);
      context.commit('GETLYRIC',res.data.lrc.lyric)
    },
    async userLogin(context,value) {
      let res = await axios.get(`/login/cellphone?phone=${value.phone}&password=${value.password}`)
      // console.log(res);
      if (res.data.code == 200) {
        context.state.user.isLogin = true
        context.state.user.account = res.data.account
        let userdetail = await axios.get(`user/detail?uid=${res.data.account.id}`)
        context.state.user.userDetail = userdetail
        window.localStorage.userData=JSON.stringify(context.state.user)
        context.commit('USERLOGIN',context.state.user)
      }
      return res
    }
  },
  getters: {
    lyricCut(state) {
      let lyricArr=[{time:'',context:''}]
      lyricArr = state.lyric.split(/\n/igs).map(item => {
        let min = item.slice(1, 3)
        let second = item.slice(4, 6)
        let millisecong = item.slice(7, 10)
        let context = item.slice(11, item.length)
        // 打包一个时间（秒）
        let time = (parseInt(min) * 60) + parseInt(second) + (millisecong / 1000)
        
        // console.log(time, context);
        // console.log(min,second,millisecong,context);
        return {time:time,context:context}
      })
      lyricArr.forEach((item, i) => {
        if ((i + 1) < lyricArr.length) {
          item.nextLyricTime=lyricArr[i+1].time
        } else {
          item.nextLyricTime=item.time
        }
      })
      // console.log(lyricArr);
      return lyricArr
    }
  },
  modules: {
  }
})
