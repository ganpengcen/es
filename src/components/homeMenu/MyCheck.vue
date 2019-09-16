<template>
    
    <el-container v-loading="loading">
        <el-main>
           <el-row style="border-bottom: 1px silver solid">
        <el-col :span="20" :offset="2">
          <el-menu class="menu2" mode="horizontal" active-text-color="#409EFF"
                   default-active="1">
            <el-menu-item index="1" class="menu_list" style="width: 50%!important;">
              <router-link to="/MyCheck/Checking"><p>当前检查单</p></router-link>
            </el-menu-item>
            <el-menu-item index="2" class="menu_list" style="width: 50%!important;">
              <router-link to="/MyCheck/Checked"><p>历史检查单</p></router-link>
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
        name: "MyCheck",
        data() {
            //定义变量
            return {
              loading:false,
            }
        }
    }
</script>

<style scoped>
a,p{
    width: 100%;
    height: 100%;
    display: block;
    line-height: 36px;
}
a{
    text-decoration: none;
}
</style>
