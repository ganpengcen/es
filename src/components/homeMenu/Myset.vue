<template>
  <div>
    <ul class="my_set">
      <!-- <li>
        <span>
          <i class="el-icon-delete"></i>
        </span>
        <span>清除缓存</span>
        <span>
          863.48k
        </span>
      </li> -->
      <li @click="upPwd">
        <span>
          <i class="iconfont iconweibiaoti2010104"></i>
        </span>
        <span>修改密码</span>
        <span>
          <i class="el-icon-arrow-right"></i>
        </span>
      </li>
      <el-dialog title="修改密码" :visible.sync="dialog1" width="100%" id="tree">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldpwd" type="password" size="small" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newpwd" type="password" size="small" placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="updatePwd">确定</el-button>
      </el-dialog>
      <!-- <li @click="$router.push({name:'About'})">
        <span>
          <i class="el-icon-warning-outline"></i>
        </span>
        <span>关于</span>
        <span>
          <i class="el-icon-arrow-right"></i>
        </span>
      </li> -->
    </ul>
    <div class="my_setbtn">
      <el-button type="primary" @click="$router.push({name:'Login'})">切换账号</el-button>
    </div>
  </div>
</template>

<script>
import api from '../../axios/api.js'
  export default {
    data() {
      return {
          api:api,
        form: {},
        dialog1: false,

        Profile:{}
      };
    },
    created(){
        this.getProfile();
    },
    methods: {
      //获取资料
      getProfile() {
        this.Profile = JSON.parse(localStorage.UserProfile);
        this.Profile.HeadIMG = api.hostname + JSON.parse(localStorage.UserProfile).HeadIMG.slice(2);
        //console.log(" this.Profile.HeadIMG", this.Profile)
      },
      upPwd() {
        this.dialog1 = true;
      },
      updatePwd() {
        let params = {
          "ID": this.Profile.ID,
          "OldPwd": this.form.oldpwd,
          "Pwd": this.form.newpwd
        }
        console.log("params",params)
        this.$post(api.changepwd,params).then( res => {
            if(res.data.state == 200){
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.dialog1 = false;
            }else{
                this.$message.error(res.data.msg)
            }
        })
      }
    }
  };

</script>

<style>
  .my_set li {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    color: #333;
  }

  .my_set li span:last-child {
    float: right;
  }

  .my_set li:nth-child(1) span:nth-child(3) {
    color: rgb(212, 24, 65);
  }

  .my_setbtn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .my_setbtn .el-button {
    padding: 12px 100px;
  }

</style>


<style scoped>
</style>
