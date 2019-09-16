// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from "./axios/api";
import '../static/css/mycss.css'
import '../static/font/iconfont.css'

import "@/assets/iconfont/iconfont.css";//引入阿里巴巴字体图标

import vuePicturePreview from 'vue-picture-preview'//图片查看器
Vue.use(vuePicturePreview)

import wcView from 'wc-view';//图片查看器
import 'wc-view/style.css';
Vue.use(wcView)

import Video from 'video.js'//视频播放器
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入vant组件库
import { SwipeCell } from 'vant';
Vue.use(SwipeCell);

//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

//引入axios
import axios from 'axios'
import {
  post,
  get,
} from './axios/axios'
Vue.prototype.$post = post;
Vue.prototype.$get = get;

//引入微信title
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle);

//转换本地时间
import moment from 'moment/moment'
Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
return moment(value).format(formatString);
});


//获取openID
Vue.prototype.openIds = function () {
  //localStorage.openID='o2a3ysogeQ-JJbzX7AdEtvHEyPe0'
  console.log("window.location.href", window.location.href)
  var test = window.location.href
  var index = test.indexOf('openID=')
  console.log("index", index)
  var urls = test.substring(index + 7, index + 35)
  console.log('urls==' + urls)
    if (index !== -1) {
      localStorage.openID = urls

      return false;
    }
    else {
      if (localStorage.openID) {
        console.log("localStorage.openID111", localStorage.openID)
        return false;
      } else {
        var test1 = window.location.href
        var name = encodeURIComponent(test1)
        console.log('123', test1, api.authcode + name);
        window.location.href = api.authcode + name
        console.log("name", name)
        console.log("test1", test1)
      }
  }
  console.log('lastOP，', localStorage.openID)
  // o2a3ysogeQ-JJbzX7AdEtvHEyPe0
 // https://open.weixin.qq.com/connect/oauth2/authorize?appid=公众号ID&redirect_uri=业务地址&response_type=code&scope=基本授权/完整授权&state=有MD5验证填写#wechat_redirect

 /*
 const appid = '' // 公众号appid
 const redirect_uri=window.location.href.split('#')[0] // 回调地址
 const scope = 'snsapi' // 授权方式
 const state = '' // 有MD5验证
 location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
 */
}

//全局守卫



Vue.config.productionTip = false;


//验证电话号码
Vue.prototype.$IsTel = function (str) {
  if (str == null) return "";
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let ph = /^1\d{10}$/;
  let mb = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  console.log("a");
  if (ph.test(str) || mb.test(str)) {
    return str;//检测电话号码格式
  } else {
    this.$message.error("请输入正确的电话号码")
  }
  return "";
};
//验证身份证
Vue.prototype.$isCard = function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let card = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
  if (card.test(str)) {
    return str;//验证身份证格式
  } else {
    this.$message.error("请输入正确的电话号码")
  }
};
//验证是否为空
Vue.prototype.$isNull = function (content) {
  if (content == '') {
    this.$message({
      type: 'warning',
      message: '输入点什么吧'
    });
    return true;
  }
};

//清空输入框
Vue.prototype.$clear = function (content) {
  if (content.constructor.name === "Objeact") {
    content = {};
  } else if (content.constructor.name === "Array") {
    content = [];
  } else if (content.constructor.name === "String") {
    content = "";
  } else if (content.constructor.name === "Boolean") {
    content = 0;
  }
  return content;
};

router.beforeEach((to, from, next) => {
  next()
  /*
  console.log("233",to.path)
  console.log("token",localStorage.token)
  console.log("openID",localStorage.openID)
  if(to.path==="/Login"){
    next();
  }
  //console.log(to.meta.requiresAuth, sessionStorage.getItem('token'))
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  //if (to.path === "/HiddenTrouble"||to.path === "/MyWork/Doingwork"||to.path === "/ApprovalPending") {
      console.log('隐患管控')
    if(localStorage.token){
      console.log("有")
      next();
    }else{
      console.log("dassssssssssssssssssssssssss");
      if(!localStorage.openID){
        console.log("dassssafafasssss大苏打的sssssssssssssssss");
        Vue.prototype.openIds();
      }
      console.log("dassss阿达大大ssssssssssssssssssssss",localStorage.openID);
      Vue.prototype.$get(api.signinbyopenid + "/" + localStorage.openID).then(res => {
        console.log("没有",res)
       if (res.data.state === 1000) {
         //this.loading = false;
         //this.$router.push({path: '/'});
         this.$message.error(res.data.msg);
         next({path:'/Login'})
       }
       if (res.data.state === 200) {
         console.log("res", res)
         localStorage.UserProfile = JSON.stringify(res.data.data.UserProfile);
         localStorage.token = res.data.data.UserInfo.Token;
         // localStorage.Type='application/json';
         //sessionStorage.header = res
         localStorage.AccountID = res.data.data.AccountID;
         console.log("tokens",localStorage.token)
         console.log("AccountIDs",localStorage.AccountID)
         // this.$router.push({path: '/Home'});
         next()
       }
     });
    }


  //  else {
  //   if (to.meta.requiresAuth && !localStorage.getItem("token")) {
  //     next({
  //       path: "/"
  //     });
  //   } else {
  //     next();
  //   }
  // }
  */
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

