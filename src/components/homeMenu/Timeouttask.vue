<template>
  <div>
    <div class="tableList" v-for="(item,index) of Table" :style="item.HasDone?'background-color:#2bb673':''"
      :key="index">
      <div class="table" @click="menu(item)">
        <el-col :span="12" class="mrl">
          <span>名字：{{item.Name}}</span>
        </el-col>
        <el-col :span="10" class="mrl">
          <span>频率：{{item.CycleValue}}次/{{item.CycleName}}</span>
        </el-col>
        <el-col :span="22" class="mrl">
          <span>危险点名字：{{item.DangerName}}</span>
        </el-col>
        <el-col :span="12" class="mrl">
          <span>任务期限：{{item.LastTime}}</span>
        </el-col>
        <el-col :span="10" class="mrl">
          <span>剩余时间：{{item.TimeOutHours}}分钟</span>
        </el-col>
      </div>
      <div class="list" @click="newBill(item.TaskID)">
        <div class="listContent">
          <span>新建单据</span>
        </div>
      </div>
    </div>
    <div class="dialog" style="positin:relative">
      <el-dialog title="详情" :visible.sync="dialogFormVisible" width="300px">
        <p style="font-size: 18px;text-align: left; padding:30px 30px;">{{TaskDescription}}</p>
        <p @click="closeDialog"
          style="position:relative;color: #409EFF;letter-spacing:5px;bottom: 0;width:100%;padding:10px 0px;text-align:center; font-size: 16px;border-top: 1px solid #ccc;">
          确认</p>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="新建单据" :visible.sync="dialogFormVisible2" width="300px">
        <el-form :model="billForm">
          <el-form-item label="开始时间：">
            <!-- <el-input v-model="billForm.FlowMemo"></el-input> -->
            <el-date-picker v-model="selectDatetime" type="datetime" placeholder="选择时间" @change="dataSearch"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <div class="jump">
            <el-checkbox v-model="checked">跳转到单据</el-checkbox>
          </div>
          <p style="padding-bottom:40px">
            <span class="subbtn" @click="submitBill">提交</span>
          </p>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import api from "@/axios/api";
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        selectDatetime: "", //选择时间
        Table: [],
        dialogFormVisible: false, //模态框默认关闭
        TaskDescription: "", //详情
        dialogFormVisible2: false,
        billForm: {},
        checked: true, //复选框状态
        TaskID: ""
      };
    },
    mounted() {
      this.gettimetask();
      // console.log(this.selectDatetime)
    },
    created() {
      this.initData({});
    },
    methods: {
      //提交新建单据
      submitBill() {
        let params = {
          TaskID: this.TaskID,
          StartTime: this.selectDatetime,
          EndTime: this.selectDatetime
        };
        console.log("params",params)
        this.$post(api.addbill, params).then(res => {
          if (res.data.state == 200) {
            Toast("新建成功");
            if (this.checked) {
              this.$router.push({
                path: "/MyCheck/Checking"
              });
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
        this.dialogFormVisible2 = false;
      },
      dataSearch() {
        this.getListByDataTime();
      },
      async initData(data) {
        //获取当前时间
        var now = new Date();
        var monthn = now.getMonth() + 1;
        var yearn = now.getFullYear();
        var dayn = now.getDate();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        this.selectDatetime =
          yearn + "-" + monthn + "-" + dayn + " " + h + ":" + m + ":" + s;

        this.selectUser = parseInt(sessionStorage.getItem("userid"));
        this.getListByDataTime();
      },
      async getListByDataTime(data) {},

      //打开新建单据
      newBill(ID) {
        this.dialogFormVisible2 = true;
        this.TaskID = ID;
        console.log("ID", ID);
      },
      //获取超期任务
      gettimetask() {
          this.$get(api.gettimetask).then(res => {
            //   console.log(res.data)
            if (res.data.state === 200) {
              this.Table = res.data.data;
              this.total = res.data.data.Items;
              console.log("table", this.Table);
            } else {
              this.$message.error(res.data.msg);
            }
          });
      },
      //详情
      menu(item) {
        this.dialogFormVisible = true;
        this.TaskDescription = item.TaskDescription;
      },
      //点击确定关闭模态框
      closeDialog() {
        this.dialogFormVisible = false;
      }
    }
  };

</script>

<style>
  .dialog .el-dialog__body {
    padding: 0 0;
  }

  .dialog .el-dialog__title {
    color: #409eff;
  }

</style>


<style scoped>
  .subbtn {
    letter-spacing: 3px;
    padding: 4px 10px 4px 13px;
    box-sizing: border-box;
    font-size: 14px;
    color: white;
    font-weight: 500;
    border-radius: 5px;
    background-color: #409eff;
  }

  .jump .el-checkbox {
    margin-bottom: 20px;
  }

</style>
