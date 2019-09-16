<template>
  <el-container v-loading="loading">
    <div class="risk">
      <el-main>
        <!-- <header-title title="企业安全管理"></header-title> -->
        <div class="content">
          <ul>
            <div v-for="(item,index) in innovation" :key="index">
              <router-link :to="{path:'/Announcement/Detail',query:{id:item.InstitutionID,name:item.Name}}">
                <li>
                  <div class="list_box">
                    <span>{{item.Name}}</span>
                    <span>{{item.InstitutionType}}</span>
                  </div>
                  <div class="list_box">
                    <span>{{item.BigCode}}</span>
                    <span>{{item.IssueDate}}</span>
                  </div>
                </li>
              </router-link>
              
            </div>


            <!-- <router-view></router-view> -->
          </ul>
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import api from "../../axios/api";

export default {
  name: "Announcement",
  data() {
    //定义变量
    return {
      loading: false,
      innovation: []
    };
  },
  created() {
    this.getdocinslist();
    console.log("id",this.$route.query);
    // console.log(this.$route.query.name)
  },
  methods: {
    getdocinslist() {
      this.$get(api.getdocinslist).then(res => {
        if (res.data.state == 200) {
          this.innovation = res.data.data;
          //   console.log(this.innovation);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
    //详情
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
  padding: 2px 0px;
}
.list_box > span:nth-child(1) {
  padding-left: 5px;
}
.list_box > span:nth-child(2) {
  padding-right: 5px;
}
</style>




<style scoped>
</style>