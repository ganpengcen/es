<template>
  <el-container v-loading="loading">
    <el-main>
      <div class="hiddent" v-for="item in arrs" :key="item.KeyID">
        <router-link :to="{path:'/HiddenTrouble/Hiddendetail',query:{bookinfo:item,id:item.KeyID}}">
          <van-swipe-cell>
            <div class="hidden1">
              <p>{{item.DangerPoint}}</p>
              <p>负责人：{{item.Principal}}</p>
              <p>{{item.State}}</p>
            </div>
            <div class="hidden2">
              <p>{{item.CDangerLevelName}}</p>
              <p>{{item.TroubleLevelName}}</p>
            </div>
            <van-button
              v-if="item.Cuser==2||item.Cuser==4"
              square
              slot="right"
              type="danger"
              text="申请验收"
              @click.prevent="openyanshou(item.KeyID)"
            />
            <van-button
              v-if="item.Cuser==1||item.Cuser==4||item.Cuser==5"
              square
              slot="right"
              type="danger"
              text="处理"
              @click.prevent="detail(item)"
            />
            <van-button
              v-if="item.Cuser==1||item.Cuser==4||item.Cuser==5"
              square
              slot="right"
              type="danger"
              text="归档"
              @click.prevent="openyanshou1(item.KeyID)"
            />
            <van-button
              v-if="item.Cuser==1||item.Cuser==4||item.Cuser==5"
              square
              slot="right"
              type="danger"
              text="转让责任人"
              @click.prevent="responsible(item)"
            />
            <van-button
              v-if="item.Cuser==1||item.Cuser==4||item.Cuser==5"
              square
              slot="right"
              type="danger"
              text="快速处理"
              @click.prevent="openyanshou2(item.KeyID)"
            />
            <van-button
              v-if="item.Cuser==3||item.Cuser==5"
              square
              slot="right"
              type="danger"
              text="验收"
              @click.prevent="openyanshou3(item.KeyID)"
            />
          </van-swipe-cell>
        </router-link>
      </div>
      <!-- 验收 -->
      <div class="yanshou">
        <el-dialog title="验收" :visible.sync="dialogVisible3" width="80%">
          <el-radio-group v-model="radio">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
          <el-input placeholder="请在此输入备注" v-model="input" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3= false">取 消</el-button>
            <el-button type="primary" @click="confirmCheck">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 申请验收 -->
      <div class="yanshou">
        <el-dialog title="申请验收" :visible.sync="dialogVisible" width="80%">
          <el-input placeholder="请在此输入备注" v-model="input1" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="applyCheck">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 快速处理 -->
      <div class="yanshou">
        <el-dialog title="快速处理" :visible.sync="dialogVisible2" width="80%">
          <el-input placeholder="请在此输入备注" v-model="input" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="fastDtail">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 归档 -->
      <div class="yanshou">
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="80%">
          <span>确定归档吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="pigeonhole">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import api from "../../axios/api";
import { Toast } from "vant";
export default {
  name: "HiddenTrouble",
  data() {
    //定义变量
    return {
      loading: false,
      arrs: [],
      dialogVisible: false, //验收模态框状态
      dialogVisible1: false, //申请验收模态框状态
      dialogVisible2: false, //快速处理模态框状态
      dialogVisible3: false, //归档模态框状态
      radio: 1, //双向绑定验收单选框
      input: "", //双向绑定验收input
      input1: "", //双向绑定申请验收input
      ControlID: "" //需要上传的id
    };
  },
  
  created() {
    //this.login();
    this.getTroubleCtr();
  },
  mounted() {
    //     this.$nextTick(() => {
    //     this.$refs.ipt.focus()
    // })
  },
  methods: {
    
    //转让责任人
    responsible(e) {
      // console.log(e.KeyID);
      // sessionStorage.responsibleId = '';
      // sessionStorage.responsibleId = e.KeyID;
      this.$router.push({
        name: "Responsible",
        query: { ID: e.KeyID }
      });
    },
    //处理
    detail(e) {
      sessionStorage.detailId = "";
      sessionStorage.detailId = e.KeyID;
      this.$router.push({
        name: "Controldetail",
        params: {
          // detailId:e.KeyID,
          CDangerLevelName: e.CDangerLevelName,
          TroubleLevelName: e.TroubleLevelName
        }
      });
    },
    openyanshou(e) {
      this.dialogVisible = true;
      this.ControlID = e;
      // console.log(this.ControlID);
    },
    openyanshou1(e) {
      this.dialogVisible1 = true;
      this.ControlID = e;
      // console.log(this.ControlID);
    },
    openyanshou2(e) {
      this.dialogVisible2 = true;
      this.ControlID = e;
      // console.log(this.ControlID);
    },
    openyanshou3(e) {
      this.dialogVisible1 = true;
      this.ControlID = e;
      // console.log(this.ControlID);
    },
    //验收
    confirmCheck() {
      var params = {
        ControlID: this.ControlID,
        FlowMemo: this.input,
        FlowType: 2,
        FlowResult: this.radio
      };
      this.$post(api.addTroubleCtrFlow, params).then(res => {
        // console.log(res);
        if (res.data.state == 200) {
          Toast("验收完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible3 = false;
    },
    //申请验收
    applyCheck() {
      var params = {
        ControlID: this.ControlID,
        FlowMemo: this.input1,
        FlowType: 1,
        FlowResult: 0
      };
      this.$post(api.addTroubleCtrFlow, params).then(res => {
        // console.log(res);
        if (res.data.state == 200) {
          Toast("申请验收完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible = false;
    },
    //快速处理
    fastDtail() {
      var params = {
        CtrID: this.ControlID,
        Description: this.input
      };
      this.$post(api.quickHandleCtr, params).then(res => {
        // console.log(res);
        if (res.data.state == 200) {
          Toast("处理完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible2 = false;
    },
    // 归档
    pigeonhole() {
      this.$get(api.filed + "/" + this.ControlID).then(res => {
        if (res.data.state == 200) {
          Toast("处理完成");
        } else {
          this.$message.error(res.data.msg);
        }
        this.dialogVisible1 = false;
      });
    },
    //获取管控项列表信息
    getTroubleCtr() {
      this.$get(api.getTroubleCtr).then(res => {
        if (res.data.state == 200) {
          // console.log(res.data.data);
          this.arrs = res.data.data;
          for (var i = 0; i < this.arrs.length; i++) {
            switch (this.arrs[i].State) {
              case 1:
                this.arrs[i].State = "管控中";
                break;
              case 2:
                this.arrs[i].State = "申请验收";
                break;
              case 3:
                this.arrs[i].State = "已验收";
                break;
              case 4:
                this.arrs[i].State = "已归档";
                break;
            }
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>


<style>
.hiddent {
  border-bottom: 1px solid #ccc;
}
.hiddent .van-button--danger:nth-child(1) {
  background-color: #00574b;
  border: 1px solid #00574b;
  z-index: 9999;
}
.hiddent .van-button--danger:nth-child(2) {
  background-color: #d81b60;
  border: 1px solid #d81b60;
  z-index: 9999;
}
.hiddent .van-button--danger:nth-child(3) {
  background-color: #2bb673;
  border: 1px solid #2bb673;
  z-index: 9999;
}
.hiddent .van-button--danger:nth-child(4) {
  background-color: #ffa500;
  border: 1px solid #ffa500;
  z-index: 9999;
}
.hiddent .van-button--danger:nth-child(5) {
  background-color: pink;
  border: 1px solid pink;
  z-index: 9999;
}
.hidden1,
.hidden2 {
  display: flex;
  justify-content: space-between;
  padding: 0px 8px;
  box-sizing: border-box;
}
.hidden1 > p:nth-child(1) {
  width: 85px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 验收 */
.yanshou .el-icon-close:before {
  content: "";
}
.yanshou .el-icon-close:before {
  text-align: left;
}
.yanshou .el-dialog__header {
  text-align: left;
  font-weight: bold;
}
.yanshou .el-dialog__body {
  text-align: left;
  padding: 10px 20px;
}
.yanshou .el-input {
  margin-top: 10px;
}
</style>


<style scoped>
</style>