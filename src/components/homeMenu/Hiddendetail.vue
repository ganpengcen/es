<template>
  <div>
    <div class="hiddendetail">
      <ul>
        <li>
          <span>执行人</span>
          <span>{{datas.Executor}}</span>
        </li>
        <li>
          <span>验收人</span>
          <span>{{datas.Acceptor}}</span>
        </li>
        <li>
          <span>预计完成时间</span>
          <span>{{datas.EstimatedDate}}</span>
        </li>
        <li>
          <span>风险等级</span>
          <span>{{datas.CDangerLevelName}}</span>
        </li>
        <li>
          <span>隐患等级</span>
          <span>{{datas.TroubleLevelName}}</span>
        </li>
        <li>
          <span>主体</span>
          <span>{{datas.SubName}}</span>
        </li>
        <li>
          <span>风控项</span>
          <span>{{datas.DangerName}}</span>
        </li>
      </ul>
      <div class="control_target">
        <p>管控目标</p>
        <div>{{datas.CtrTarget}}</div>
      </div>
      <div class="problem_description">
        <p>问题描述<span>发现人:{{datas.FEmp}}</span></p>
        <div>{{datas.TroubleDetails}}</div>
      </div>
      <div>
        <div v-for="(item,index) in pictures" :key="index" class="photo">
            <img style="width:100px;height:100px" v-preview="api.hostname + item.FileUrl.slice(2)"
            v-if="item.FileType == 'image/png' || item.FileType == 'png' || item.FileType == 'jpg' || item.FileType == 'image/jpeg'" :src="api.hostname + item.FileUrl.slice(2)" alt="">
          <video @click="playVideo" id="myVideo" class="video" v-else
            :src="api.hostname + item.FileUrl.slice(2)"></video>
         

          
          <el-input v-model="item.FileTitle" :disabled="true" style="width:48vw"></el-input>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import api from '../../axios/api'

  export default {
    name: "Hiddendetail",
    data() {
      return {
        api: api,
        datas: {}, //接收组件传过来的数据
        BusinessID: '', //传参
        pictures: [],
        id: ''

      }
    },
    created() {
      this.datas = this.$route.query.bookinfo;
      this.BusinessID = this.$route.query.bookinfo.BID;

    },
    mounted() {
      this.getfiles();
      // console.log(api.hostname)
      // console.log(this.pictures);
      // for(var i=0;i<this.pictures.length;i++){
      //     this.$refs.video.src = this.api.hostname + this.pictures[i].FileUrl.slice(1);
      //     console.log('this.$refs.video.src',this.$refs.video.src)
      // }

    },
    methods: {
      getfiles() {
        var FileUrls = [];
        var Url = {}
        console.log("BillID ", this.BusinessID);
        this.$get(api.getfiles + '/' + this.BusinessID).then((res) => {
          // console.log(res);
          if (res.data.state == 200) {
            this.pictures = res.data.data;
            // for (var i = 0; i < res.data.data.length; i++) {
             
            //     Url = api.hostname + res.data.data[i].FileUrl.slice(2)
            // }
            // FileUrls.push(Url);
            // console.log('this.pictures', FileUrls);

            // for(var j =0;j<this.pictures.length;j++){
            //     this.pictures[i].push(FileUrls)
            // }
            // console.log('this.pictures', this.pictures);

          } else {
            this.$message.error(res.data.msg);
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
  }

</script>


<style>
  .hiddendetail ul li {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }

  .control_target,
  .problem_description {
    text-align: left;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
  }

  .control_target>div,
  .problem_description>div {
    margin: 6px 0px;
    width: 98%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #ccc;
    overflow: auto;
    font-size: 14px;
    padding: 5px 10px;
    box-sizing: border-box;
  }

  .problem_description>p>span {
    margin-left: 40px;
  }

  .photo {
    text-align: left;
    padding: 8px 5px;
  }

</style>

<style scoped>
 .video {
    width: 30vw;
    height: 25vw;

  }
</style>
