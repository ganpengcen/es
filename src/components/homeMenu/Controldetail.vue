<template>
  <div>
    <div class="detail">
      <ul>
        <li @click="choosecarry">
          <span>执行人</span>
          <span>
            {{carryname}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <li @click="Controldetail">
          <span>验收人</span>
          <span>
            {{checkname}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <li @click="showtime">
          <span>预计完成时间</span>
          <span>
            {{currentDate1}}
            <!-- {{currentDate|moment}} -->
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <div class="nobottom">
          <el-dialog title="选择时间" :visible.sync="centerDialogVisible" width="100%">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              @cancel="centerDialogVisible=false"
              @confirm="Confirm"
            />
          </el-dialog>
        </div>

        <li @click="showrisk">
          <span>风险等级</span>
          <span>
            {{CDangerLevelName}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <el-dialog title="风险等级选择" :visible.sync="centerDialogVisible_risk" width="100%">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="centerDialogVisible_risk=false"
            @confirm="confirmRisk"
          />
        </el-dialog>
        <li @click="showhiddendanger">
          <span>隐患等级</span>
          <span>
            {{TroubleLevelName}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
        <el-dialog title="隐患等级选择" :visible.sync="centerDialogVisible_hiddendanger" width="100%">
          <van-picker
            show-toolbar
            :columns="columns2"
            @cancel="centerDialogVisible_hiddendanger=false"
            @confirm="confirmhiddedanger"
          />
        </el-dialog>
        <div class="taskDescribe">
          <h3>管控目标</h3>
          <div>
            <textarea rows="4" v-model="textArea" placeholder="请输入管控目标"></textarea>
          </div>
        </div>
      </ul>
      <div class="btn">
        <el-button type="primary" @click="submitDanger">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker } from "vant";
import api from "../../axios/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      detailid: "", //接收传过来的管控id
      CDangerLevelName: "", //接收传过来的风险等级
      TroubleLevelName: "", //接受传过来的等级隐患
      currentDate: new Date(), //双向绑定时间模态框
      currentDate1: "", //渲染到页面的时间值
      centerDialogVisible: false, //时间模态框状态
      centerDialogVisible_risk: false, //风险等级模态框
      centerDialogVisible_hiddendanger: false, //隐患等级模态框
      minDate: new Date(), //从何时的时间开始算起
      columns: [], //风险等级选项
      columns2: [], //隐患等级选项
      columnsid: [], //风险等级选项id
      columns2id: [], //隐患等级选项id
      postId: "", //需要提交风险等级id
      postId2: "", //需要提交隐患等级id
      carryname: "", //页面显示的执行人名字
      carryid: "", //需要上传的执行人id
      checkname: "", //页面显示的验收人名字
      checkid: "", //需要上传的验收人id
      textArea: "", //需要上传的管控目标描述
      postDate:''
    };
  },
  created() {
    this.detailid = sessionStorage.detailId
    // console.log(this.detailid)
    this.CDangerLevelName = this.$route.params.CDangerLevelName;
    console.log(this.CDangerLevelName)
    
    this.TroubleLevelName = this.$route.params.TroubleLevelName;
    this.getTroubleLevel();
    this.getdangerdict();
    this.carryname = sessionStorage.OrgName1;
    this.carryid = sessionStorage.peopleId1;
    this.checkname = sessionStorage.OrgName;
    this.checkid = sessionStorage.peopleId;
  },
  destroyed() {},
  methods: {
    //显示隐患模态框
    showhiddendanger() {
      this.centerDialogVisible_hiddendanger = true;
    },

    //时间转换
     formatDateTime (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var s = date.getSeconds();
    this.postDate=y + '-' + m + '-' + d+' '+h+':'+minute+':'+s
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+s;

},
    //确认隐患等级以及需要提交的id
    confirmhiddedanger(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.TroubleLevelName = `${value}`;
      this.centerDialogVisible_hiddendanger = false;
      this.postId2 = this.columns2id[`${index}`];
      // console.log(this.postId2);
    },
    //确认风险等级
    confirmRisk(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.CDangerLevelName = `${value}`;
      this.centerDialogVisible_risk = false;
      this.postId = this.columnsid[`${index}`];
      // console.log(this.postId);
    },
    //显示风险模态框
    showrisk() {
      this.centerDialogVisible_risk = true;
    },
    //确定时间
    Confirm() {
      this.currentDate1 = this.currentDate.toLocaleDateString();
      this.centerDialogVisible = false;
      this.formatDateTime(this.currentDate);
      // console.log(this.postDate)
    },
    //显示时间模态框
    showtime() {
      this.centerDialogVisible = true;
    },

    //获取隐患等级
    getTroubleLevel() {
      this.$get(api.getTroubleLevel).then(res => {
        if (res.data.state == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.columns2.push(res.data.data[i].DictName);
            this.columns2id.push(res.data.data[i].ID);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //获取风险等级
    getdangerdict() {
      this.$get(api.getdangerdict).then(res => {
        if (res.data.state == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.columns.push(res.data.data[i].DictName);
            this.columnsid.push(res.data.data[i].ID);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //提交隐患管控
    submitDanger() {
      var params = {
        CtrID: this.detailid,
        ExecutorID: this.carryid,
        AcceptorID: this.checkid,
        FinishTime: this.postDate,
        ControlDescription: this.textArea
      };
      console.log(params)
      this.$post(api.handleCtr,params).then(res=>{
        if(res.data.state==200){
          Toast("提交成功");
          this.$router.push('/HiddenTrouble')
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    choosecarry() {
      this.$router.push({
        name: "Choosecarry"
      });
    },
    Controldetail() {
      this.$router.push({
        name: "Choodecheck"
      });
    }
  }
};
</script>
<style>
.detail ul li {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
  line-height: 36px;
  border-bottom: 1px solid #ccc;
}
.detail ul li span {
  display: inline-block;
}
.nobottom ul li {
  border-bottom: none;
}
.detail .van-picker-column ul li {
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
.btn {
  margin-top: 15px;
}
</style>

<style scoped>
</style>
