<template>
  <div style="margin-top:10px">
    <div
      class="tableList"
      v-for="(item,index) of Table"
      :style="item.HasDone?'background-color:#2bb673':''"
      :key="index"
    >
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
      <div class="list" @click="newBill(item)">
        <div class="listContent">
          <span>新建单据</span>
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="详情" :visible.sync="dialogFormVisible" width="300px">
        <p style="font-size: 18px;text-align: left; padding:30px 30px;">{{TaskDescription}}</p>
        <p
          @click="closeDialog"
          style="position:relative;color: #409EFF;letter-spacing:5px;bottom: 0;width:100%;padding:10px 0px;text-align:center; font-size: 16px;border-top: 1px solid #ccc;"
        >确认</p>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="新建单据" :visible.sync="dialogFormVisible2" width="300px">
        <el-form :model="billForm">
          <el-form-item label="开始时间：">
            <!-- <el-input v-model="billForm.FlowMemo"></el-input> -->
            <el-date-picker
              v-model="selectDatetime"
              type="datetime"
              placeholder="选择时间"
              @change="dataSearch"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <div class="jump">
            <el-checkbox v-model="checked">跳转到单据</el-checkbox>
          </div>
          <p style="padding-bottom:40px">
            <span class="subbtn" @click="submitnewBill">提交</span>
          </p>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import { Toast } from 'vant';
export default {
  data() {
    return {
      selectDatetime: "",//模态框时间选择
      Table: [],
      dialogFormVisible: false,
      TaskDescription: "", //详情
      dialogFormVisible2: false,
      billForm: {},
      checked: "true",//复选框状态
      taskId: ""//提交的任务id
    };
  },
  mounted() {
    this.gettasklist();
  },
  methods: {
    //提交新建单据
    submitnewBill() {
      let params = {
        TaskID: this.taskId,
        StartTime: this.selectDatetime,
        EndTime: "2020-07-15 16:27:12"
      };
      this.$post(api.addbill,params).then(res=>{
        if(res.data.status==200){
          if(checked){
            Toast('新建成功');
            this.$router.push({
              name:'Checking'
            })
          }
        }else{
          this.$message.error(res.data.msg);
        }
        this.dialogFormVisible2 = false;
      })
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
    newBill(val) {
      this.dialogFormVisible2 = true;
      this.taskId = val.TaskID;
    },
    //获取正常任务
    gettasklist() {
      this.$get(api.gettasklist).then(res => {
        console.log(res);
        if (res.data.state === 200) {
          this.Table = res.data.data;
          this.total = res.data.data.Items;
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


