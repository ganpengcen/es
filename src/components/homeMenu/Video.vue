<template>
  <el-container v-loading="loading">
    <div class="risk">
      <el-main>
        <!-- <header-title title="企业安全管理"></header-title> -->
        <div class="content">
          <ul>
            <div v-for="item in videos" :key="item.ID">
                <div @click="see(item.Url)">
                  <li>
                    <div class="list_box">
                        <span>{{item.Code}}</span>
                        <span>{{item.Site}}</span>
                      </div>
                  </li>
                </div>
            </div>
          </ul>
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import api from "../../axios/api";
export default {
  name: "Video",
  data() {
    //定义变量
    return {
      loading: false,
      videos: [],
   
    };
  },
  created() {
    this.getvideolist();
    // console.log(this.$route.query)
  },
  methods: {
    //跳转到外部监控视频
    see(e){
      // console.log(e);
      window.location.href='http://'+e;
    },
    //获取视频参数
    getvideolist() {
      this.$get(api.getvideolist).then(res => {
        if (res.data.state == 200) {
          this.videos = res.data.data;
          console.log(this.videos)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>



<style>
a:hover {
  text-decoration: none;
  color: #000;
}
.risk {
  width: 100%;
}
.risk .el-main {
  width: 100%;
  text-align: left;
  padding: 0;
  margin: 0;
}
.risk .content {
  margin: 0;
}
.risk ul li {
  border-bottom: 1px solid #ccc;
}
.list_box {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  font-size: 14px;
}
.list_box > span:nth-child(1) {
  padding-left: 10px;
}
.list_box > span:nth-child(2) {
  padding-right: 10px;
}
</style>


<style scoped>
</style>