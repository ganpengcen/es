<template>
  <el-container v-loading="loading">
    <el-main>
      <el-row style="border-bottom: 1px silver solid">
        <el-col :span="20" :offset="2">
          <el-menu class="menu2" mode="horizontal" active-text-color="#409EFF" default-active="1">
            <el-menu-item index="1" class="menu_list" style="width: 50%!important;;">
              <div class="box">
                <router-link to="/MyWork/Doingwork" style="text-decoration:none">当前</router-link>
              </div>
            </el-menu-item>
            <el-menu-item index="2" class="menu_list" style="width: 50%!important;">
              <div class="box">
                <router-link to="/MyWork/Downwork" style="text-decoration:none">已完成</router-link>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "MyWork",
  data() {
    //定义变量
    return {
      loading: false

    };
  },
  methods: {
   
  }
};
</script>

<style scoped>
.content {
  margin-top: 0px;
}
</style>