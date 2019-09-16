<template>
  <div>
    <div class="taskresult">
      <ul>
        <li @click="Gostandard">
          <p>查看检查标准</p>
          <p>
            <i class="el-icon-arrow-right"></i>
          </p>
        </li>
        <li>
          <p>检查时间</p>
          <p>{{arrs.ResultTime}}</p>
        </li>
        <li>
          <p>检查结果</p>
          <p>{{arrs.TaskResult}}</p>
        </li>
      </ul>
      <div class="discripe">
        <p>描述</p>
        <textarea :disabled="true" cols="45" v-model="arrs.TaskResultMemo" rows="4" style="width:90%"></textarea>
      </div>
      <div class="camera">
        <div v-for="(item ,index) in files" :key="index" class="shi_box">
          <img
            v-if="item.FileType == 'image/png' ||  item.FileType == 'JPEG' ||item.FileType == 'jpg'  || item.FileType == 'bmp'  || item.FileType == 'gif' || item.FileType == 'image/jpeg'"
            class="imgs_img" :src="item.FileUrl" alt="" v-preview="item.FileUrl">
          <video @click="playVideo" class="video" v-else id="myVideo"
            :src="item.FileUrl"></video>

          <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
            :options="playerOptions"></video-player> -->


          <el-input v-model="item.FileTitle" :disabled="true" style="width:48vw" placeholder="请输入标题"></el-input>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from "../../axios/api";

  import {
    videoPlayer
  } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    components: {
      videoPlayer
    },
    data() {
      return {
        api: api,
        resultId: "",
        arrs: {},
        BillID: '',

        //文件
        files: [],

        videos: [],

        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [],
          poster: "../../static/images/test.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        }

      };
    },
    created() {
      this.resultId = this.$route.query.resultId;
      this.BillID = this.$route.query.BillID;
      // console.log(this.$route.query.BillID)
      // console.log(this.$route.query.resultId)
      this.getsubresult();
      this.getfiles();
    },
    mounted() {

    },
    methods: {
      Gostandard() {
        this.$router.push({
          name: 'Standard',
          query: {
            BillID: this.BillID
          }
        })
        //   console.log(this.BillID)
      },
      //获取数据
      getsubresult() {
        this.$get(api.getsubresult + "/" + this.resultId).then(res => {
          if (res.data.state == 200) {
            this.arrs = res.data.data;
            console.log(res.data.data)
            switch (res.data.data.TaskResult) {
              case 1:
                this.arrs.TaskResult = "正常";
                break;
              case 2:
                this.arrs.TaskResult = "异常";
                break;
              case 3:
                this.arrs.TaskResult = "管控中";
                break;
              case 4:
                this.arrs.TaskResult = "处理后异常";
                break;
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //根据业务id获取电子文件
      getfiles() {
        this.videos = [];
        var video = {};

        this.$get(api.getfiles + '/' + this.resultId).then(res => {
          if (res.data.state == 200) {
            this.files = res.data.data;
            for (var i = 0; i < res.data.data.length; i++) {
              this.files[i].FileUrl = api.hostname + res.data.data[i].FileUrl.slice(2)
              video.video = res.data.data[i].FileUrl
              video.type = res.data.data[i].FileType
            }
            this.videos.push({
              src: video.video,
              type: 'video/' + video.type
            })
            console.log("videos", this.videos)
            this.playerOptions.sources = this.videos;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //播放视频
      playVideo() {
        var vdo = document.getElementById("myVideo");

        if(vdo.style.width=='100%'){
             vdo.setAttribute('style','width: 30vw;height: 25vw;')
             vdo.pause(); //暂停
        }else{
             vdo.setAttribute('style','position: absolute;top:0;bottom: 0;left: 0;right: 0;width:100%;height:100%;z-index:99;background: #000;')
             vdo.play();//播放
        }
      },

    }
  };

</script>

<style>
  .taskresult ul li {

    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }

  .taskresult ul li p {
    font-size: 14px;
    line-height: 36px;
  }

  .discripe p {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 40px;
  }

  .discripe textarea {
    color: #666;
    border-radius: 5px;
  }

  .camera {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    box-sizing: border-box;
  }

  .camera p {
    font-weight: bold;
    font-size: 16px;
    line-height: 36px;
  }

  .camera p i {
    color: rgb(24, 115, 233);
  }

  .imgs_img {
    width: 25vw;
    height: 25vw;
  }

  .video {
    width: 30vw;
    height: 25vw;

  }

  .shi_box {
    display: flex;
    align-items: center;
  }

</style>
