<template>
  <el-container v-loading="loading">
    <el-main>
      <template>
        <div v-show="index == 1" class="panel-body">
          <el-row>
            <el-col :span="24">
              <div style="width: 100%;">
                <img src="../../static/img/scan.png" alt="" height="30px" width="30px" style="display: block;position: absolute;right:5px;top: 5px;z-index: 100" @click="click">
                <img src="../../static/img/home_banner.png" alt style="height: 6rem;width: 100%" />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/MyTask'});">
                <img src="../../static/img/ic6.png" alt class="img" />
                <p>我的任务</p>
                <span v-show='rwNum != 0'>{{rwNum}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/MyCheck'});">
                <img src="../../static/img/ic27.png" alt class="img" />
                <p>我的检查单</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/MyWork'});">
                <img src="../../static/img/ic5.png" alt class="img" />
                <p>我的作业</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/TemporaryTask'});">
                <img src="../../static/img/ic4.png" alt class="img" />
                <p>临时任务</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/Announcement'});">
                <img src="../../static/img/ic9.png" alt class="img" />
                <p>公示公告</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/Video'});">
                <img src="../../static/img/ic10.png" alt class="img" />
                <p>视频监控</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/HiddenTrouble'});">
                <img src="../../static/img/ic36.png" alt class="img" />
                <p>隐患管控</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/ApprovalPending'});">
                <img src="../../static/img/ic35.png" alt class="img" />
                <p>待审批</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/TrainingManage'});">
                <img src="../../static/img/ic40.png" alt class="img" />
                <p>培训管理</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/Security'});">
                <img src="../../static/img/ic41.png" alt class="img" />
                <p>安全会议</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="list_img" @click=" $router.push({path: '/textApply'});">
                <img src="../../static/img/ic41.png" alt class="img" />
                <p>作业申请</p>
              </div>
            </el-col>
            <!--<el-col :span="8">-->
              <!--<div class="list_img" @click=" $router.push({path: '/Scan'});">-->
                <!--<img src="../../static/img/ic41.png" alt class="img" />-->
                <!--<p>扫一扫</p>-->
              <!--</div>-->
            <!--</el-col>-->
          </el-row>
        </div>

        <div v-show="index == 2" class="panel-body">
          <el-row style="border-bottom: 1px silver solid">
            <el-col :span="20" :offset="2">
              <el-menu class="menu2" @select="handleSelect2" mode="horizontal" active-text-color="#409EFF"
                default-active="1">
                <el-menu-item index="1" class="menu_list">
                  <p>风险点</p>
                </el-menu-item>
                <el-menu-item index="2" class="menu_list">
                  <p>管控项</p>
                </el-menu-item>
                <el-menu-item index="3" class="menu_list">
                  <p>超期任务</p>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
          <div v-show="index2 == 1" class="panel-body">
            <el-row>
              <el-col :span="24">
                <el-menu class="menu3" @select="handleSelect3" mode="horizontal" active-text-color="#409EFF"
                  :default-active="index3">
                  <el-menu-item :index="index+''" class="menu_list" v-for="(item,index) of levelItem" :key="index">
                    <p>
                      <span>
                        {{item.LevelName}}(
                        <span>{{item.Count}}</span>)
                      </span>
                    </p>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="24" v-for="(item,index) of tTable" :key="index"
                style="text-align: left;margin: 2px 0;border-bottom: 1px silver solid">
                <el-col :span="10" class="mrl">
                  <span>{{item.DangerLevel}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.Principal}}</span>
                </el-col>
                <el-col :span="20" class="mrl">
                  <span>{{item.DangerPoint}}</span>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div v-show="index2 == 2" class="panel-body">
            <el-row>
              <el-col :span="24">
                <el-menu class="menu3" @select="handleSelect4" mode="horizontal" active-text-color="#409EFF"
                  :default-active="index4">
                  <el-menu-item :index="index+''" class="menu_list2" v-for="(item,index) of ctrMenu" :key="index">
                    <p>
                      <span>
                        {{item.MemuDesc}}(
                        <span>{{item.Count}}</span>)
                      </span>
                    </p>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="24" v-for="item of ctrTable" :key="item"
                style="text-align: left;margin: 2px 0;border-bottom: 1px silver solid">
                <el-col :span="22" class="mrl">
                  <span>{{item.DangerPoint}}</span>
                </el-col>
                <el-col :span="22" class="mrl">
                  <span>{{item.Danger}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.BillEmp}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.Principal}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.DangerLevel}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.TroubleLevel}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.SubType}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.CheckSub}}</span>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div v-show="index2 == 3" class="panel-body">
            <el-row>
              <el-col :span="24" v-for="(item,index) of TimeOutTable" :key="index"
                style="text-align: left;margin: 2px 0;border-bottom: 1px silver solid">
                <el-col :span="10" class="mrl">
                  <span>{{item.Name}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.EmpOrPost}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.OverHours}}</span>
                </el-col>
                <el-col :span="10" class="mrl">
                  <span>{{item.DangerLevel}}</span>
                </el-col>
                <el-col :span="23" class="mrl">
                  <span>{{item.DangerPoint}}</span>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="mine">
          <div v-show="index == 3" class="panel-body">
            <ul>
              <li @click="$router.push({name:'Mydata'})">
                <div class="imgs"><img :src="Profile.HeadIMG"></div>
                <span>{{Profile.CNName}}</span>
                <span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </li>
              <li @click="$router.push({name:'Myset'})">
                <span>
                  <i class="el-icon-setting"></i>
                </span>
                <span>设置</span>
                <span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </li>
              <li @click="$router.push({name:'Mymessage'})">
                <span>
                  <i class="el-icon-s-comment"></i>
                </span>
                <span>我的消息</span>
                <span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </li>
              <li @click="debindss">
                <span>
                  <i class="el-icon-s-comment"></i>
                </span>
                <span>解除账号绑定</span>
                <span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>

      </template>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24">
          <el-menu class="el-menu-demo" @select="handleSelect" mode="horizontal" active-text-color="#409EFF"
            default-active="1">
            <el-menu-item index="1" class="menu_list">
              <div>
                <i class="iconfont icon-home"></i>
                <p>首页</p>
              </div>
            </el-menu-item>
            <el-menu-item index="2" class="menu_list">
              <div @click="statistics">
                <i class="iconfont icon-tongji"></i>
                <p>统计</p>
              </div>
            </el-menu-item>
            <el-menu-item index="3" class="menu_list">
              <div>
                <i class="iconfont icon-yonghu2"></i>
                <p>我</p>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-footer>
    <!-- <el-dialog title="解除账号绑定" :visible.sync="dig" width="100%">
      <p>请输入密码:</p>
      <el-input v-model="pass"></el-input>
      <span slot="footer">
        <el-button size="small" @click="dig=false">取消</el-button>
        <el-button size="small" type="primary" @click="debind">确定</el-button>
      </span>
    </el-dialog> -->
  </el-container>
</template>

<script>
  import headerTitle from "../components/assembly/Header";
  import wx from 'weixin-js-sdk'
  import api from "../axios/api";

  export default {
    name: "Home",
    data() {
      weixinTitle: "zaaaaa";
      //定义变量
      return {
        pass:'',  //解除绑定密码
        dig:false,
        api: api,
        loading: false, //加载页
        menu: [], //菜单
        index: "1", //当前页
        index2: 1, //统计页
        index3: "0", //统计选项
        index4: "0", //
        levelItem: [], //风险等级
        tTable: [], //统计风险点列表
        ctrMenu: [], //管控菜单
        ctrTable: [], //统计管控菜单列表
        TimeOutTable: [], //超期任务列表
        //风险点分页
        PageSize: 5,
        PageIndex: 1,
        total: 0,
        scanID:'',
        //管控分页
        PageSize2: 5,
        PageIndex2: 1,
        total2: 0,
        //超期任务
        PageSize3: 5,
        PageIndex3: 1,
        total3: 0,
        rwNum:0,
        //用户资料
        Profile: {},
      };
    },

    components: {
      headerTitle
    },
    //计算属性
    // computed: {},
    // 在created之前
    // beforeCreate() {
    // },
    //html加载前，初始数据获取
    //   created: {},
    //html加载后,页面初始化方法
    created() {


    },
    mounted() {
      this.gettimetask();
      this.getProfile();
      this.getWxConfig();
       //this.getOpenID();
    },
    //监听
    watch: {
      index3: function () {
        let LevelID = this.levelItem[this.index3].LevelID;
        // console.log("LevelID", LevelID);
        this.getDangerPointsPage(LevelID);
      },
      index4: function () {
        let MenuValue = this.ctrMenu[this.index4].MenuValue;
        // console.log("MenuValue", MenuValue);
        this.getTroubleCtrsPage(MenuValue);
      }
    },
    //调用方法
    methods: {
        getWxConfig() {
        let url = location.href.split('#')[0];
        console.log("url", url)
        this.$get(api.wxjscfg + '?url=' + url).then(res => {
          if (res.data.state == 200) {
            console.log("res", res)
            res.data.data.jsApiList.push('scanQRCode')
            wx.config({
              debug: false,
              appId: res.data.data.appId,
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature, // 必填，签名，见附录1
              jsApiList: res.data.data.jsApiList
            })
            wx.error(function(res) {
              //alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
            });

            wx.ready(function() {
              wx.checkJsApi({
                jsApiList : ['scanQRCode'],
                success : function(res) {
                }
              });
            });
          } else {
            this.$message.error(res.msg);
          }
        })
      },
       click() {
       var _that = this;
         _that.$router.push({
           name: 'scanPage',
           query: {
             ID:  '1df04b9c-69c3-4a5a-af58-db13d3a4e68b'  //res.resultStr
           }
         })
       wx.ready(function () {
         wx.scanQRCode({
           needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
           scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
           success: function (res) {
             localStorage.setItem('res',JSON.stringify(res))
             localStorage.setItem('this',JSON.stringify(this))
//             var result = JSON.parse(res); // 当needResult 为 1 时，扫码返回的结果
//             _that.scanID=result.resultStr
               console.log('12121212')
               _that.$router.push({
                 name: 'scanPage',
                 query: {
                   ID:  '1df04b9c-69c3-4a5a-af58-db13d3a4e68b'  //res.resultStr
                 }
               })
             },
         });
       })
     },
         debindss () {
        this.$get(api.userwxunbind + localStorage.openID).then(res=> {
          if(res.data.state == 200){
            localStorage.openID = ''
            localStorage.AccountID = ''
            localStorage.token = ''
            this.$router.push({path: '/Login'})
            //console.log("111res.data.state",res.data.state)
          }else{
            this.$message.error(res.data.msg)
          }
        })
        },  //解除账号绑定
      //获取资料
      getProfile() {
        if(localStorage.UserProfile) {
          this.Profile=JSON.parse(localStorage.UserProfile)
           this.Profile.HeadIMG = api.hostname + this.Profile.HeadIMG.slice(2);
          console.log('this.Profile',this.Profile)


          /*this.Profile = JSON.parse(localStorage.UserProfile);
          this.Profile.HeadIMG = api.hostname + JSON.parse(localStorage.UserProfile).HeadIMG.slice(2);
          console.log(" this.Profile.HeadIMG", this.Profile)*/
        }
      },
      //获取超期任务
      gettimetask() {
        this.$get(api.gettimetask).then(res => {
          //   console.log(res.data)
          if (res.data.state === 200) {
              this.rwNum = res.data.data.length;
            //this.Table = res.data.data;
            //this.total = res.data.data.Items;
            console.log("table", res);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },

      //获取超期任务
      getTimeOutTask() {
        let params = {
          PageSize: this.PageSize3,
          PageIndex: this.PageIndex3 - 1,
          KeyWord: "",
          Query: "",
          OrderString: "",
          ToExcel: true
        };
        //console.log("params", params);
        this.$post(api.getTimeOutTask, params).then(res => {
          if (res.data.state == 200) {
            this.TimeOutTable = res.data.data.Data;
            this.total3 = res.data.data.Items;
            console.log("TimeOutTable", this.TimeOutTable)
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //获取管控详情
      getTroubleCtrsPage(val = "") {
        let params = {
          PageSize: this.PageSize2,
          PageIndex: this.PageIndex2 - 1,
          KeyWord: "sample string 3",
          Query: val,
          OrderString: "",
          ToExcel: true
        };
        // console.log("params", params);
        this.$post(api.getTroubleCtrsPage, params).then(res => {
          if (res.data.state == 200) {
            this.ctrTable = res.data.data.Data;
            this.total2 = res.data.data.Items;
            // console.log("ctrTable", this.ctrTable)
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //获取风险点详情
      getDangerPointsPage(LevelID = "") {
        let params = {
          PageSize: this.PageSize,
          PageIndex: this.PageIndex - 1,
          KeyWord: "",
          Query: LevelID,
          OrderString: "",
          ToExcel: true
        };
        // console.log("params", params);
        this.$post(api.getDangerPointsPage, params).then(res => {
          if (res.data.state == 200) {
            this.tTable = res.data.data.Data;
            this.total = res.data.data.Items;
            // console.log("tTable", this.tTable)
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //打开统计
      statistics() {
        this.getDangerLevels();
        this.getCtrMenu();
        this.getTimeOutTask();
      },
      //获取管控菜单
      getCtrMenu() {
        this.ctrMenu = [];
        this.$get(api.getCtrMenu).then(res => {
          if (res.data.state === 200) {
            res.data.data.forEach(item => {
              this.ctrMenu.push(item);
            });
            //console.log("this.ctrMenu", this.ctrMenu);
            // console.log("index4",this.index4)
            if (this.index4 == "0") {
              this.getTroubleCtrsPage(1);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //获取风险等级
      getDangerLevels() {
        this.levelItem = [];
        this.$get(api.getDangerLevels).then(res => {
          if (res.data.state === 200) {
            res.data.data.forEach(item => {
              this.levelItem.push(item);
            });
            //console.log("this.levelItem", this.levelItem)
            // console.log("index3",this.index3)
            if (this.index3 == 0) {
              this.getDangerPointsPage(this.levelItem[0].LevelID);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //页面跳转
      handleSelect(key, keyPath) {
        this.index = key;
        // console.log(this.index)
      },
      //页面跳转
      handleSelect2(key, keyPath) {
        this.index2 = key;
        // console.log(this.index2)
      },
      //页面跳转
      handleSelect3(key, keyPath) {
        this.index3 = key;
        // console.log("i3", this.index3);
      },
      //页面跳转
      handleSelect4(key, keyPath) {
        this.index4 = key;
        // console.log("i4", this.index3);
      }
    }
  };

</script>


<style>
  .mine .panel-body {
    text-align: left;
  }

  .mine .panel-body ul li {
    line-height: 40px;
    font-size: 16px;
    padding: 0 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }

  .mine .panel-body ul li span:nth-child(3) {
    float: right;
  }

  .mine .imgs {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
  }

  .mine .imgs img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
  }

</style>


<style scoped>
  .img {
    width: 50%;
    margin-bottom: 0.5rem;
  }

  .menu3 {
    height: 3rem;
    justify-content: space-between;
    overflow: hidden;
  }

  .menu3>.menu_list {
    padding: 0 0;
    height: 3rem !important;
    width: 25% !important;
  }

  .menu3>.menu_list>p {
    line-height: 3rem !important;
  }

  .menu3>.menu_list2 {
    padding: 0 0;
    height: 3rem !important;
    width: 50% !important;
  }

  .menu3>.menu_list2>p {
    line-height: 3rem !important;
  }

  .mrl {
    margin-right: 10px;
    margin-left: 10px;
  }

  .mr {
    margin-right: 10px;
  }

  .ml {
    margin-left: 10px;
  }

  .list_img {
    position: relative;
  }
  .list_img:hover{
    opacity: 0.7;
  }
  .list_img:active{
    opacity: 0.7;
  }

  .list_img span {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    right: 27%;
    top: 0%;
    color: white;
  }

  /* 导航栏 */

</style>
