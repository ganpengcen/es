<template>
  <el-container v-loading="loading">
    <el-main>
      <header-title title="绑定"></header-title>
      <div class="content">
        <el-form :model="formItem">
          <el-input class="login_input" v-model="formItem.AccountCode">
            <img src="../../static/img/ic1.png" slot="prefix" class="icon el-input__icon">
          </el-input>
          <el-input class="login_input" v-model="formItem.Login">
            <img src="../../static/img/ic3.png" slot="prefix" class="icon el-input__icon">
          </el-input>
          <el-input class="login_input" v-model="formItem.Pwd" type="password">
            <img src="../../static/img/ic_21.png" slot="prefix" class="icon el-input__icon">
          </el-input>
        </el-form>
        <el-button type="primary" @click='signin(formItem)' class="button1" round><span class="p18">绑定</span>
        </el-button>
      </div>

    </el-main>
  </el-container>
</template>

<script>
  import headerTitle from '../components/assembly/Header'
  import api from "../axios/api";

  import wx from 'weixin-js-sdk';

  export default {
    name: "Login",
    data() {
      //定义变量
      return {
        loading: false,
        formItem: {},
      }
    },
    components: {
      headerTitle
    },
    //计算属性
    //computed: {},
    // 在created之前
    beforeCreate() {
          // this.openIds()
    },
    //html加载前，初始数据获取
    //created: {},
    //html加载后,页面初始化方法
    mounted() {
        //  this.login();
     // this.getWxConfig();
    },
    //监听
    //watch: {},
    //调用方法
    methods: {
    //     getWxConfig() {
    //     let url = location.href.split('#')[0];
    //     console.log("url", url)
    //     this.$get(api.wxjscfg + '?url=' + url).then(res => {
    //       if (res.data.state == 200) {
    //         console.log("res", res)
    //         wx.config({
    //           debug: false,
    //           appId: res.data.data.appId,
    //           timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    //           nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //           signature: res.data.data.signature, // 必填，签名，见附录1
    //           jsApiList: res.data.data.jsApiList
    //         })
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //   },
      //页面跳转
      login() {
        if(!localStorage.openID){
          this.openIds()
        }
        this.loading = true;
        console.log("loginlocalStorage.openID", localStorage.openID);
        this.$get(api.signinbyopenid + "/" + localStorage.openID).then(res => {
          console.log('openres',res)
          if (res.data.state === 1000) {
            this.loading = false;
          }
          if (res.data.state === 200) {
            console.log("res", res)
            localStorage.UserProfile = JSON.stringify(res.data.data.UserProfile);
            localStorage.token = res.data.data.UserInfo.Token;
            // localStorage.Type='application/json';
            //sessionStorage.header = res
            localStorage.AccountID = res.data.data.AccountID;
            console.log("token",localStorage.token)
            console.log("AccountID",localStorage.AccountID)
           // this.$router.push({path: '/'});
        }
        })
      },
      //绑定
      signin(form) {
        let params = {
          "AccountCode": form.AccountCode,
          "Login": form.Login,
          "Pwd": form.Pwd,
          "openID": localStorage.openID
        }
        this.$post(api.userwxbind, params).then(res => {
          console.log(res)
          if (res.data.state === 200) {
            this.login();   // this.$root.push({path:'/'});
          } else {

            this.$message.error(res.data.msg);
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
