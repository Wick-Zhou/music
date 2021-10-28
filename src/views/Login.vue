<template>
  <div class="login">
    <div class="logo"></div>
      账号：<input v-model="phone" type="text" placeholder="请输入手机号" /><br />
      密码：<input v-model="password" type="password" name="" id="" placeholder="请输入密码"/>
      <button type="submit" @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone:'17628237618',
      password:'Zw2573681101'
    }
  },
  methods: {
    async login(){
      let res= await this.$store.dispatch('userLogin',{phone:this.phone,password:this.password})
      // console.log(res);
      if(res.data.code==200){
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 7.5rem;
  height: 100vh;
  background-color: rgb(190, 5, 5);
  position: relative;
  .logo {
    width: 40px;
    height: 40px;
    background: url(../assets/images/topbar.png) no-repeat 3px -15px;
    position: absolute;
    left: calc(50% - 20px);
    top: calc(40% - 20px);
  }
}
</style>
