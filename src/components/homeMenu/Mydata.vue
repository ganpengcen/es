<template>
  <div class="mydata">
    <ul>
      <li>
        <span>我的头像</span>
        <div>
          <el-upload class="avatar-uploader"    :action="api.hostname+'api/attachfile/uploadfile'"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
            :file-list="fileList" :headers="headers">
            <img :src="imageUrl" alt="">
            <i class="el-icon-arrow-right"></i>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>
      </li>
      <li @click="CNName">
        <span>我的昵称</span>
        <input type="text" dir="rtl" v-model="Profile.CNName">
      </li>
      <el-dialog title="我的昵称" :visible.sync="dialog1" width="100%" id="tree">
        <el-form :inline="true" :model="Profile" class="demo-form-inline">
          <el-form-item label="昵称">
            <el-input v-model="Profile.CNNames" size="small" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="updateCNName">确定</el-button>
      </el-dialog>
      <li @click="Tel">
        <span>手机号码</span>
        <input type="number" dir="rtl" v-model="Profile.Tel">
      </li>
      <el-dialog title="手机号码" :visible.sync="dialog2" width="100%" id="tree">
        <el-form :inline="true" :model="Profile" class="demo-form-inline">
          <el-form-item label="手机号码">
            <el-input v-model="Profile.Tels" size="small" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="updateTel">确定</el-button>
      </el-dialog>
    </ul>
    <div class="mydata_btn">
      <el-button type="primary" @click="setProfile">确认修改</el-button>
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from "vant";
  import api from "../../axios/api.js";
  export default {
    data() {
      return {
        api: api,
        nickname: "ztt",
        phonenumber: 15228166586,
        //昵称
        dialog1: false,
        //手机
        dialog2: false,
        //头像
        fileList: [],
        imageUrl: '',
        headers: {
          Token: localStorage.token,
          AccountID: localStorage.AccountID
        },
        //用户资料
        Profile: {}
      };
    },
    created() {
      this.getProfile();
    },
    methods: {
      //获取资料  
      getProfile() {
        console.log('localStorage.UserProfile',localStorage.UserProfile)
        if(localStorage.UserProfile){
          this.Profile =JSON.parse(localStorage.UserProfile);
          if(this.Profile.HeadIMG){
            this.imageUrl = api.hostname + this.Profile.HeadIMG.slice(2);
            console.log(" this.imageUrl", this.imageUrl);
          }
        }
      },
      //设置用户资料
      setProfile() {
        let params = {
          Login: this.Profile.Login,
          CNName: this.Profile.CNName,
          Tel: this.Profile.Tel,
          HeadIMG: this.Profile.HeadIMG
        };
        console.log("params", params)
        this.$post(api.setprofile, params).then(res => {
          console.log(res)
          if (res.data.state == 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            // this.get
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      //昵称
      CNName() {
        this.dialog1 = true;
      },
      updateCNName() {
        this.Profile.CNName = this.Profile.CNNames;
        this.dialog1 = false;
      },
      //手机
      Tel() {
        this.dialog2 = true;
      },
      updateTel() {
        var phone = this.Profile.Tels;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
          Toast('手机号码有误,请重新输入');
          return false;
        }
        this.Profile.Tel = this.Profile.Tels;
        this.dialog2 = false;
      },
      //上传成功
      handleAvatarSuccess(res, file, fileList) {
        //console.log(res);
        if (res.state == 200) {
          console.log('res.data',res.data)
          this.Profile.HeadIMG = res.data;
          this.imageUrl = api.hostname + res.data.slice(2)
          console.log("imageUrl", this.imageUrl)
        } else {
          this.$message.error(res.data.msg)
        }
      },
      beforeAvatarUpload() {},
      confirmAment() {
        Toast.success("修改成功");
        //   console.log(this.$refs.ipt.value)
      }
    }
  };

</script>

<style>
  .mydata ul li {
    font-size: 16px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    padding: 0 8px;
  }

  .mydata ul li span {
    line-height: 40px;
  }

  .mydata ul li:nth-child(1) i {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    line-height: 50px;
    font-size: 18px;
  }

  .mydata ul li:nth-child(1) span:nth-child(1) {
    line-height: 50px;
  }

  .mydata ul li div {
    display: inline-block;
    height: 50px;
    float: right;
    vertical-align: middle;
  }

  .mydata ul li div img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .mydata_btn .el-button {
    position: fixed;
    bottom: 20px;
    padding: 12px 100px;
    transform: translateX(-50%);
  }

  .mydata ul li input {
    float: right;
    margin-top: 6px;
    outline: none;
    border: none;
  }

</style>
