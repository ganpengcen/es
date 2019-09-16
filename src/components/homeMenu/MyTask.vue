<template>
  <el-container v-loading="loading">
    <el-main>
      <el-row style="border-bottom: 1px silver solid">
        <el-col :span="20" :offset="2">
          <el-menu class="menu2" mode="horizontal" active-text-color="#409EFF" default-active="1">
            <el-menu-item index="1" class="menu_list" style="width: 50%!important;;">
              <router-link to="/MyTask/Currenttask" style="text-decoration:none">
                <div class="box">
                  正常任务
                </div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="2" class="menu_list" style="width: 50%!important;">
              <router-link to="/MyTask/Timeouttask" style="text-decoration:none">
                <div class="box">
                  超期任务
                </div>
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import api from "@/axios/api";
  export default {
    name: "MyTask",
    data() {
      //定义变量
      return {
        tabPosition: "正常任务",
        loading: false,
        index2: 1, //统计页
        //风险点分页
        PageSize: 5,
        PageIndex: 1,
        total: 0
      };
    },
    //计算属性
    computed: {},
    //html加载前，初始数据获取
    //created: {},
    //html加载后,页面初始化方法
    mounted() {
      // this.gettasklist();
    },
    //监听
    watch: {},
    //调用方法
    methods: {
      //页面跳转
      handleSelect2(key, keyPath) {
        this.index2 = key;
        console.log(this.index2);
      }
    }
  };

</script>

<style>

</style>
<style scoped>
  a,
  .box {
    width: 100%;
    height: 100%;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
