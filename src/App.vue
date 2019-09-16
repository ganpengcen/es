<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <lg-preview></lg-preview>
  </div>
</template>

<script>

  import api from '@/axios/api.js'
export default {
  name: 'App',
  data(){
    return{

    }
  },
 beforeCreate() {
    if(!localStorage.openID) {
      this.openIds()
    }
     let _this = this
     $.ajax({
       async: false,
       url: api.signinbyopenid + "/" + localStorage.openID,
       type: 'get',
       dataType: 'json',
        beforeSend: function(xhr) {
          const token = localStorage.token;
          const accountid = localStorage.AccountID;
            xhr.setRequestHeader('Token',token);
            xhr.setRequestHeader('AccountID',accountid)
        },
       success: function(res) {
         if(res.state === 1000) {
            _this.$router.push({
              path: '/Login'
            })
         } else if (res.state === 200) {
           console.log('user',res)
           localStorage.token = res.data.UserInfo.Token;
           localStorage.AccountID = res.data.AccountID;
              localStorage.UserProfile = JSON.stringify(res.data.UserProfile);
         }
       }
     })

  }
}
</script>

<style>

#app {

}
</style>
