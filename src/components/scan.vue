<template>
  <div>
    <button @click="getWxConfig">点击1</button>
    <p>:{{data}}</p>
    <p>D:{{d}}</p>
    <p>this:{{t}}</p>
    <p>that:{{th}}</p>
  </div>
</template>
<script>
 import wx from 'weixin-js-sdk'
 import api from '../axios/api'
export default{
    data(){
        return{
            wxjscfg:{},
          data:'',
          d:'',
          t:'',
          th:'',
        }
    },
    methods:{
      getWxConfig() {
        this.$router.push({
          name:'scanPage',
          query:{
            ID:'1551'
          }
        })
//        wx.ready(function(){
//        wx.scanQRCode({
//          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//          success: function (res) {
//            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//            var da=res.resultStr
//             var da2 = da.split(',')
//            this.data=da2[0]
//            console.log('res',result)
//            this.data=res.resultStr
//          },
//          error : function(){
//            console.log('123');
//          }
//        });
//        })
      },
    },
  created(){
      console.log('created')
      this.d=localStorage.res
      this.t=localStorage.this
      this.th=localStorage.that
  }
    }
</script>
<style scoped>
</style>
