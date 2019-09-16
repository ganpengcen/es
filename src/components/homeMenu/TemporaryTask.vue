<template>
  <div v-loading="loading">
    <div class="addtask">
      <ul>
        <li>
          <span>任务名称</span>
          <input type="text" ref="ipt" v-model="ipt">
        </li>
        <li @click="openStarttime">
          <span>开始时间</span>
          <span>
            {{starttime}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <div class="nobottom">
          <el-dialog title="选择时间" :visible.sync="centerDialogVisible_starttime" width="100%">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              @cancel="centerDialogVisible_starttime=false"
              @confirm="Confirm"
            />
          </el-dialog>
        </div>
        <li @click="openEndtime">
          <span>截止时间</span>
          <span>
            {{endtime}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <div class="nobottom">
          <el-dialog title="选择时间" :visible.sync="centerDialogVisible_endtime" width="100%">
            <van-datetime-picker
              v-model="currentDate_end"
              type="date"
              :min-date="minDate_end"
              @cancel="centerDialogVisible_endtime=false"
              @confirm="ConfirmEnd"
            />
          </el-dialog>
        </div>
        <li @click="centerDialogVisible_showChoosejob=true">
          <span>执行岗位</span>
          <span>
            {{Showchoosejob}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <el-dialog title="岗位选择" :visible.sync="centerDialogVisible_showChoosejob" width="100%">
          <van-picker
            show-toolbar
            :columns="columns_choosejob"
            @cancel="centerDialogVisible_showChoosejob=false"
            @confirm="confirmChoosejob"
          />
        </el-dialog>
        <li @click="fengxians">
          <span>风险点</span>
          <span>
            {{Showchooserisk}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <el-dialog title="风险点选择" :visible.sync="centerDialogVisible_showChooserisk" width="100%">
          <van-picker
            show-toolbar
            :columns="columns_chooserisk"
            @cancel="centerDialogVisible_showChooserisk=false"
            @confirm="confirmChooserisk"
          />
        </el-dialog>
        <li @click="fenkongs">
          <span>风控项</span>
          <span>
            {{riskcontrol}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <div class="treelist">
          <ul>
            <li v-for="(item,index) in TaskSubjects" :key="index">
              <span>{{item.SubName}}</span>
            </li>
          </ul>
        </div>
        <el-dialog title="风控项选择" :visible.sync="fenkong" width="100%" id="tree">
          <el-tree
            :data="subjecttype"
            show-checkbox
            node-key="id"
            ref="tree"
            @check="getCheckedNodes"
            @node-click="handleNodeClick"
            :props="defaultProps"
          ></el-tree>

          <el-button type="primary" @click="fenkongQue">确定</el-button>
        </el-dialog>
      </ul>
      <div class="taskDescribe">
        <h3>任务描述</h3>
        <div>
          <textarea rows="4" v-model="textArea" placeholder="请输入相关描述"></textarea>
        </div>
      </div>
      <div class="photo">
        <p>
          <span type="primary" class="wrapper">
            <label class="btn" for="fileUpload">拍照&视频</label>
          </span>
          <span class="camera" @click="selectFile">
            <i class="el-icon-camera-solid"></i>
          </span>
          <!--调取相机-->
          <input
            type="file"
            accept="image/*"
            style="display:none;"
            id="a"
            @change="uploadImg($event)"
          >
        </p>
        <div class="imgs_box">
          <div class="imgs_list_box" v-for="(item,index) in imgss" :key="index">
            <div class="imgs_img_box">
              <img
                :src="api.hostname + item.FileUrl.slice(2)"
                class="avatar"
                v-preview="api.hostname + item.FileUrl.slice(2)"
              >
            </div>
            <!-- <div class="imgs_img_box" @click="playVideo" v-else>
              <video class="video" id="myVideo" :src=" api.hostname + item.FileUrl.slice(2)"></video>
            </div>-->

            <el-input
              v-model="imgTitles[index]"
              @blur="shiqu"
              style="width:48vw"
              placeholder="请输入标题"
            ></el-input>
            <div>
              <!-- <template slot-scope="scope"> -->
              <div class="icon_boxs" @click="del(index)">
                <i class="el-icon-delete"></i>
              </div>
              <!-- </template> -->
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="addtemptask">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker } from "vant";
import api from "../../axios/api";
import { Toast } from "vant";
import { Icon } from "vant";

import axios from "axios";

import wx from "weixin-js-sdk";

export default {
  name: "TemporaryTask",
  data() {
    //定义变量
    return {
      api: api,
      loading: false,
      ipt: "", //任务名
      //   时间相关
      centerDialogVisible_starttime: false, //开始时间模态框
      centerDialogVisible_endtime: false, //截止时间模态框
      currentDate: new Date(),
      minDate: new Date(),
      starttime: "请选择", //开始时间
      currentDate_end: new Date(),
      minDate_end: new Date(),
      endtime: "请选择", //截止时间
      //   岗位相关
      centerDialogVisible_showChoosejob: false, //岗位选择模态框
      columns_choosejob: [], //岗位列表
      columns_choosejobid: [], //岗位列表id
      Showchoosejob: "请选择", //展示在页面上岗位
      postchoosejobid: "", //需要上传的岗位id
      //   风险点相关
      centerDialogVisible_showChooserisk: false, //风险点选择模态框
      columns_chooserisk: [], //风险点列表
      columns_chooseriskid: [], //风险点列表id
      Showchooserisk: "请选择", //展示在页面上的风险点
      postchooseriskid: "", //需要上传的风险点id
      //任务描述
      textArea: "",
      postDate: "", //上传的开始时间
      postDate1: "", //上传的截止时间
      // 风控项
      riskcontrol: "添加",
      fenkong: false,
      //巡查主体类型
      subjecttype: [],
      peopleList: [],
      TaskSubjects: [], //风控项选择
      defaultProps: {
        children: "Subss",
        label: "SubName"
      },
      //拍照
      Header: [], //图片路径
      images: "",
      headers: {
        Token: localStorage.token,
        AccountID: localStorage.AccountID
      },
      imageUrl: "",
      //展示图片集合
      imgs_list: [],
      //标题
      imgTitles: [],
      imgss: []
    };
  },
  created() {
    this.getposts();
    //this.getDangerPointSelector();
    //this.subjecttypes();
  },
  mounted() {
    this.$refs.ipt.focus();
    //this.getWxConfig();
  },
  methods: {
    //   getWxConfig() {
    //     let url = location.href.split('#')[0];
    //     console.log("url", url)
    //     this.$get(api.wxjscfg + '?url=' + url).then(res => {
    //       if (res.data.state == 200) {
    //         console.log("res", res)
    //         wx.config({
    //           debug: false,
    //           appId: res.data.data.appId,
    //           timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    //           nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //           signature: res.data.data.signature, // 必填，签名，见附录1
    //           jsApiList: res.data.data.jsApiList
    //         })
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //   },

    selectFile() {
      document.getElementById("a").click();

      // 调微信摄像头
      //     let $this = this;
      //     wx.chooseImage({
      //       count: 1, // 最多可以选择的图片张数，默认9
      //       sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      //       sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      //       success: function (res) {
      //           console.log( "res",res)
      //         // $this.images.localId = res.localIds;
      //         // let obj = {};
      //         // obj.src = res.localIds;
      //         // $this.ioslocId.push(obj);
      //         // $this.scrollFn();
      //         // $this.uploadImge();
      //         // if ($this.ioslocId.length >= 9) {
      //         //   $this.imgBoolean = false;
      //         // }

      //       }
      //     });
    },

    //上传文件
    uploadImg(e) {
      //var files = document.getElementById("a").files[0];
      var files = e.target.files[0]; //获取上传的文件信息

      var formData = new FormData();
      formData.append("content", files);
      //console.log("222", formData.get("content"))
      console.log("filess", files);
      //formData.append(" "," ")
      //console.log("re222s", localStorage.Type)
      // boundary=;s
      /*
        axios(api.hostname + 'api/attachfile/uploadfile', {
            method: 'post',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryExT8avmSnrECoDbP'
            }
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          */

      let token = localStorage.getItem("token");
      let accId = localStorage.getItem("AccountID");
      // let config = {
      //   'Content-Type': 'multipart/form-data;',
      //   'AccountID': accId,
      //   'token': token
      // }
      let instance = axios.create({
        headers: {
          AccountID: accId,
          token: token
        }
      });

      var imgs = {};
      console.log("formData", formData);
      console.log("api.hostname", api.hostname);
      //
      instance
        .post(api.hostname + "api/attachfile/uploadfile", formData)
        .then(res => {
          console.log(res.data);
          this.Header.push(res.data.data); //图片路径

          //for (var i = 0; i < fileList.length; i++) {
          imgs.FileType = files.type;
          imgs.FileUrl = res.data.data;
          //}

          this.imgss.push(imgs);

          console.log("img", this.imgss);
        });

      // axios.post(api.hostname + 'api/attachfile/uploadfile', {
      //       formData
      //     }, {
      //       headers: {
      //         'AccountID': accId,
      //         'token': token
      //       }
      //     })
      //     .then(res => {
      //         console.log(res)
      //     })
      //     .catch(e => fn)

      // this.$post(api.hostname + 'api/attachfile/uploadfile', formData).then(res => {
      //   if (res.data.state == 200) {

      //     console.log("res", res)
      //     localStorage.Type = 'application/json';
      //   } else {
      //     this.$message.error(res.data.msg)
      //   }
      // })
    },
    //上传成功
    //   handleAvatarSuccess(res, file, fileList) {
    //     //this.imgss = [];
    //     var imgs = {};
    //     if (res.state == 200) {
    //       console.log("res", res)
    //       //this.imgs_list.push(api.hostname + res.data.slice(2)); //图片路径
    //       this.Header.push(res.data); //图片路径

    //       for (var i = 0; i < fileList.length; i++) {
    //         (imgs.FileType = fileList[i].raw.type), (imgs.FileUrl = res.data);
    //       }

    //       this.imgss.push(imgs);

    //       console.log("img", fileList);
    //     } else {
    //       this.$message.error(res.msg);
    //     }
    //   },
    //失去焦点时赋值
    shiqu() {
      let imgTitle = this.imgTitle;
      if (imgTitle) {
        this.imgTitles.push(imgTitle);
      }
      console.log("this.imgTitles", this.imgTitles);
    },
    //删除图片
    del(index) {
      this.imgs_list.splice(index, 1);
      this.imgss.splice(index, 1);
    },

    //提交
    addtemptask() {
      for (var i = 0; i < this.imgss.length; i++) {
        this.imgss[i].FileTitle = this.imgTitles[i];
      }
      var arrAy = [];
      var arrays = [];
      var arrayss = [];
      for (var i = 0; i < this.TaskSubjects.length; i++) {
        for (var j = 0; j < this.subjecttype.length; j++) {
          if (this.subjecttype[j].SubTypeID == this.TaskSubjects[i].SubTypeID) {
            arrAy.push({
              SubjectType: this.TaskSubjects[i].SubType,
              SubjectID: this.TaskSubjects[i].SubTypeID,
              DangerID: this.TaskSubjects[i].Subss
            });
          } 
        }
      }

    //   for (var k = 0; k < arrAy.length; k++) {
    //     var DangerIDs = arrAy[k].DangerID;
    //     console.log("DangerIDs", DangerIDs);
    //     for (var z = 0; z < DangerIDs.length; z++) {
    //       arrays.push({
    //         SubjectType: arrAy[k].SubjectType,
    //         SubjectID: arrAy[k].SubjectID,
    //         DangerID: DangerIDs[z].SubID
    //       });
    //     }
    //   }

      console.log("arrayss", arrayss);
      //console.log("this.imgss", this.imgss);

      let params = {
        Name: this.ipt,
        DangerPointID: this.postchooseriskid,
        StartTime: this.postDate,
        EndTime: this.postDate1,
        ExecutePostID: this.postchoosejobid,
        TaskDescription: this.textArea,
        TaskSubjects: arrays,
        AttachFiles: this.imgss
      };
      console.log("params", params);

      this.$post(api.addtemptask, params).then(res => {
        if (res.data.state == 200) {
          this.$message({
            type: "success",
            message: "新建成功"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    beforeAvatarUpload() {},
    //上传
    //   uploadVideo(e) {
    //     //e.target.value文件名
    //     var file = e.target.files[0];
    //     var formdata = new FormData();
    //     formdata.append("fileStream", file);
    //     var da = formdata.get("fileStream")
    //     console.log("file", file);
    //     console.log("正在上传视频...");
    //     console.log("da", da)
    //     this.doUpload(da);
    //   },
    //   doUpload(formdata) {
    //     this.$post(api.hostname + "api/attachfile/uploadfile", formdata).then(res => {
    //       console.log(res)
    //       if (res.state == 200) {
    //         console.log("上传成功");
    //       } else {
    //         console.log("上传失败");
    //       }
    //     });
    // axios
    //   .post("/teacher/doUpload", formdata)
    //   .then(res => {
    //     if (res.data.success) {
    //       console.log("上传成功");
    //     } else {
    //       console.log("上传失败");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //},
    //时间转换
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var s = date.getSeconds();
      this.postDate = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    },
    formatDateTime1(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var s = date.getSeconds();
      this.postDate1 = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    },
    // getFile(event) {
    //   let that = this;
    //   if (event.target.files.length < 1 || that.imglist.length > 8) {
    //     return;
    //   }
    //   // console.log(event.target.files);
    //   // console.log(event.target.files[0].name);
    //   let thefile = event.target.files[0];
    //   let videoUrl = that.getObjectURL(thefile);
    //   console.log(videoUrl);
    // },
    //打开开始时间模态框
    openStarttime() {
      this.centerDialogVisible_starttime = true;
    },
    //确定开始时间按钮
    Confirm() {
      this.starttime = this.currentDate.toLocaleDateString();
      this.centerDialogVisible_starttime = false;
      this.formatDateTime(this.currentDate);
      console.log("this.postDate", this.postDate);
    },
    //打开截止时间模态框
    openEndtime() {
      this.centerDialogVisible_endtime = true;
    },
    //确定截止时间
    ConfirmEnd() {
      this.endtime = this.currentDate_end.toLocaleDateString();
      this.centerDialogVisible_endtime = false;
      this.formatDateTime1(this.currentDate_end);
      console.log(this.postDate1);
    },
    //确定岗位选择
    confirmChoosejob(value, index) {
      this.Showchoosejob = `${value}`;
      this.postchoosejobid = this.columns_choosejobid[`${index}`];
      this.centerDialogVisible_showChoosejob = false;
    },
    //确定风险点选择
    confirmChooserisk(value, index) {
      console.log("value, index", value, index);
      this.Showchooserisk = `${value}`;
      this.postchooseriskid = this.columns_chooseriskid[`${index}`];
      this.centerDialogVisible_showChooserisk = false;
      console.log("this.postchooseriskid", this.postchooseriskid);
    },

    //获取岗位选择数据
    getposts() {
      this.$get(api.getposts).then(res => {
        if (res.data.state == 200) {
          // console.log(res)
          for (let i = 0; i < res.data.data.length; i++) {
            this.columns_choosejob.push(res.data.data[i].Name);
            this.columns_choosejobid.push(res.data.data[i].ID);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //获取风险点选择数据
    getDangerPointSelector() {
      this.$get(api.getDangerPointSelector).then(res => {
        if (res.data.state == 200) {
          console.log("getDangerPointSelector", res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.columns_chooserisk.push(res.data.data[i].Name);
            this.columns_chooseriskid.push(res.data.data[i].ID);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //风控项选择
    handleNodeClick(data) {
      console.log(data);
    },
    getCheckedNodes() {
      console.log("check", this.$refs.tree.getCheckedNodes());

      this.TaskSubjects = this.$refs.tree.getCheckedNodes();

      // for(var.)
    },
    //风控项确定
    fenkongQue() {
      this.fenkong = false;
    },
    //获取风控项
    subjecttypes() {
      let params = {
        DangerPointID: this.postchooseriskid
      };
      this.$post(api.getdangerselector, params).then(res => {
        if (res.data.state == 200) {
          this.subjecttype = res.data.data;
          for (var i = 0; i < this.subjecttype.length; i++) {
            for (var k = 0; k < this.subjecttype[i].Subs.length; k++) {
              this.subjecttype[i].SubName = res.data.data[i].SubType;
              this.subjecttype[i].Subss = res.data.data[i].Subs;
              this.subjecttype[i].Subss[k].Subss = this.subjecttype[i].Subs[
                k
              ].Dangers;

              for (
                var j = 0;
                j < this.subjecttype[i].Subss[k].Subss.length;
                j++
              ) {
                this.subjecttype[i].Subss[k].Subss[
                  j
                ].SubName = this.subjecttype[i].Subs[k].Dangers[j].DangerName;
                this.subjecttype[i].Subss[k].Subss[j].SubID = this.subjecttype[
                  i
                ].Subs[k].Dangers[j].DangerID;
              }
            }

            //this.subjecttype[i].Subss[i].Subss = this.subjecttype[i].Subss[i].Dangers
            // for (var j = 0; j < res.data.data[i].Subs[i].Dangers.length; j++) {
            //   this.subjecttype[j].Subss[j].Subss = res.data.data[j].Subs.Dangers[]
            //   //console.log(" this.subjecttype[i].Subss[i].Subss", this.subjecttype[i].Subss[i].Subss)
            // }
          }

          console.log("subjecttype", res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //根据风险点ID和主体类型的主体选择器
    //   getDangerPointRelationSelector(SubjectType) {
    //     let params = {
    //       DangerPointID: this.postchooseriskid,
    //       SubjectType: SubjectType
    //     };
    //     console.log("params", params);

    //     this.$post(api.getDangerPointRelationSelector, params).then(res => {

    //       if (res.data.state == 200) {

    //         for (let i = 0; i < res.data.data.length; i++) {

    //           //if ( res.data.data[i].Value == SubjectType && res.data.data.length > 0) {
    //             //this.subjecttype[i].Children = [];
    //             this.peopleList.push({
    //               Caption: res.data.data[i].SubjectName
    //             });
    //          // }
    //         }

    //         console.log("getDangerPointRelationSelector", res);
    //         console.log("peopleList", this.peopleList);
    //         //this.subjecttypes();
    //       } else {
    //         this.$message.error(res.data.msg);
    //       }
    //     });
    //   },
    //点击风险点
    fengxians() {
      this.centerDialogVisible_showChooserisk = true;
      this.getDangerPointSelector();
    },
    //点击风控项
    fenkongs() {
      this.fenkong = true;
      this.subjecttypes();
    },

    //播放视频
    playVideo() {
      var vdo = document.getElementById("myVideo");

      if (vdo.style.width == "100%") {
        vdo.setAttribute("style", "width: 30vw;height: 25vw;");
        vdo.pause(); //暂停
      } else {
        vdo.setAttribute(
          "style",
          "position: absolute;top:0;bottom: 0;left: 0;right: 0;width:100%;height:100%;z-index:99;background: #000;"
        );
        vdo.play(); //播放
      }
    }
  }
};
</script>

<style>
/* #tree .el-tree-node__expand-icon.is-leaf {
    color: #C0C4CC;
    cursor: default;
  } */

.addtask ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
  line-height: 36px;

  border-bottom: 1px solid #ccc;
}

.addtask ul li input {
  height: 20px;
  width: 170px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  padding-left: 5px;
  /* box-sizing: border-box; */
}

.nobottom ul li {
  border-bottom: none;
}

.addtask .van-picker-column ul li {
  justify-content: center;
  align-items: center;
}

.taskDescribe h3 {
  text-align: left;
  padding-left: 8px;
  font-size: 14px;
  line-height: 36px;
}

.taskDescribe textarea {
  width: 90%;
}

.photo p {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 14px;
  font-size: 14px;
  line-height: 36px;
}

.photo p .van-icon-photograph:before {
  font-size: 18px;
}
</style>


<style scoped>
textarea {
  outline: none;
  border: 1px solid #ccc;
}

.camera {
  font-size: 8vw;
  color: #409eff;
}

.imgs_box {
  padding: 5vw 5vw;
}

.imgs_list_box {
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  align-items: center;
}

.imgs_img_box {
  width: 25vw;
  height: 25vw;
}

.imgs_img_box img {
  width: 100%;
  height: 100%;
}

.icon_boxs {
  font-size: 5vw;
}

.video {
  width: 30vw;
  height: 25vw;
}
</style>
