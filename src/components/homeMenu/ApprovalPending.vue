<template>
  <div class="ApprovalPending-wrap">
    <div v-for="(item, index) in item" :key="index" style="border:1px solid gainsboro;margin-top: 5px">
      <van-swipe-cell>
        <div class="content" style="display: flex;justify-content: space-between">
          <div class="lContent">
            <p>业务类型:{{item.BusinessType ==1? '作业申请':item.BusinessType ==2?'巡检任务':item.BusinessType ==3?'任务单据':item.BusinessType ==4?'隐患管控':'临时任务'}}</p>
            <p>业务单据号:{{item.BusinessCode}}</p>
          </div>
          <div>
            <p>业务日期:{{item.BusinessDate}}</p>
            <p>发起时间:{{item.TaskDate}}</p>
          </div>
          <div class="rContent">
            <p>发起人:{{item.ApplyUserName}}</p>
          </div>
        </div>
        <span slot="right">
            <van-button square type="primary" @click="approve(item.ID)">审批</van-button>
            <van-button square type="primary" @click="seeBill(item.BusinessID,item.BusinessType)">查看单据</van-button>
            <van-button square type="danger" @click="getlogs(item.BusinessID)">审查日志</van-button>
        </span>
      </van-swipe-cell>
    </div>
    <el-dialog title="审批" width="100%" :visible.sync="dig1">
      <div class="dg1content">
        <el-form v-model="datadetail" labelWidth="70px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="datadetail.FlowResult">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批备注">
            <el-input type="textarea" :rows="3" v-model="datadetail.FlowMemo"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button size="small" @click="dig1=false">取消
        </el-button>
         <el-button size="small" type="primary" @click="qapprove">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="单据信息:" width="100%" :visible.sync="dig2">
        <div class="dig2Content">
          <span>作业编号：{{Bill.BillCode}}</span><br>
          <span>作业名称：{{Bill.BillName}}</span><br>
          <span>开始时间：{{Bill.StartTime}}</span><br>
          <span>结束时间：{{Bill.EndTime}}</span><br>
          <span>作业发起人：{{Bill.CreateMan}}</span><br>
          <span>发起时间：{{Bill.CreateDate}}</span><br>
          <span>作业责任人：{{Bill.PrincipalEmployeeName}}</span><br>
          <span>作业流程：{{Bill.OpreationName}}</span><br>
          <span>作业时长：{{Bill.BillLong}}</span><br>
          <span>作业申请描述：{{Bill.Description}}</span><br>
          <span>状态：{{Bill.StateName}}</span><br>
          <!-- <el-form v-model="Bill" labelWidth="100px">
            <el-form-item label="作业编号">
              <el-input v-model="Bill.BillCode" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业名称">
              <el-input v-model="Bill.BillName" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input v-model="Bill.StartTime" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input v-model="Bill.EndTime" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业发起人">
              <el-input v-model="Bill.CreateMan" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="发起时间">
              <el-input v-model="Bill.CreateDate" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业责任人">
              <el-input v-model="Bill.PrincipalEmployeeName" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业流程">
              <el-input v-model="Bill.OpreationName" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业时长">
              <el-input v-model="Bill.BillLong" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="作业申请描述">
              <el-input v-model="Bill.Description" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="Bill.StateName" disabled size="small"></el-input>
            </el-form-item>
          </el-form> -->
        </div>
        <span slot="footer">
         <el-button size="small" type="primary" @click="dg">审批操作
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="审批日志:" width="100%" :visible.sync="dig3">
      <div>
        <div v-for="(item,index) in logs" :key="index" style="text-align: left;">
          <div v-for="(item2,index2) in item.Logs" :key="index2">
            <h2 style="padding:5px 0;" v-if="item2.Users[0].ResultInfo != null">{{item2.PointName}}</h2>
            <div v-for="(item3,index3) in item2.Users" :key="index3" >
              <div v-if="item3.ResultInfo != null" style="margin-left:10vw;">
                <span>审批人：{{item3.ResultInfo.FlowUser == null ? '':item3.ResultInfo.FlowUser}}</span><br>
                <span>审批时间：{{item3.ResultInfo.FlowDate}}</span><br>
                <span>审批描述：{{item3.ResultInfo.FlowMemo}}</span><br>
                <span>审批结果：{{item3.ResultInfo.FlowResult}}</span><br>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!-- <div style="height: 300px;">
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div> -->
      <!-- <span slot="footer">
        <el-button size="small" @click="dig3=false">取消
        </el-button>
         <el-button size="small" type="primary" @click="dig3=false">确认
        </el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>

import api from '../../axios/api'

export default {
  data () {
    return {
      dig1:false,
      dig2:false,
      dig3:false,
      //列表显示
      item: [],
      //审批
      radio:1,
      approveID:'',
      datadetail:{
        FlowResult:1
      },
      info:{},

      //审批日志
      logs:[],

      //查看单据
      Bill:{},

      //分页
      pages:1,
      PageSize:50,
      total:0,
    }
  },
  created(){
    this.getmytask();
  },
  methods: {
    dg () {
      this.dig1 = true
      this.dig2 = false;
    },

    //获取待审批
    getmytask(PageIndex = 1,KeyWord =''){
      let params = {
        "PageSize": this.PageSize,
        "PageIndex": PageIndex - 1,
        "KeyWord": "",
        "Query": "",
        "OrderString": "",
        "ToExcel": true
      }

      this.$post(api.mytask,params).then( res => {
        if(res.data.state == 200){
          this.item = res.data.data.Data;
          console.log("getmytask",res)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //审批
    approve(ID){
      this.datadetail = {}
      this.dig1 = true;
      this.approveID = ID
     
    },
    //点击确定
    qapprove(){
       let params = {
        "FlowResult": this.datadetail.FlowResult,
        "FlowMemo": this.datadetail.FlowMemo,
        "TaskID": this.approveID
      }
      console.log("params",params)

      this.$post(api.approve,params).then( res => {
        if(res.data.state == 200){
          this.$message({
            type:'success',
            message:'审批成功'
          })
          this.getmytask();
          this.dig1 = false;
        }else{
          this.$message.error(res.data.msg)
        }
      })

    },

    //审查日志
    getlogs(BusinessID){
      this.dig3 = true;
      this.$get(api.getlogs + '/' + BusinessID).then( res => {
        if(res.data.state == 200){
          this.logs = res.data.data;
          console.log("getlogs",res)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //查看单据
    seeBill(BusinessID,BusinessType){
      this.dig2 = true;
      console.log("BusinessID,BusinessType",BusinessID,BusinessType)
      if(BusinessType == 1){
        this.$get(api.getmodel + '/' + BusinessID).then( res => {
          if(res.data.state == 200){
            this.Bill = res.data.data;
            console.log("seeBill1",res)
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }else if(BusinessType == 2){
        this.$get(api.getmodels + '/' + BusinessID).then( res => {
          if(res.data.state == 200){
            this.Bill = res.data.data;
            console.log("seeBill2",res)
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }
}
</script>
<style  scoped>
  .ApprovalPending-wrap{
    overflow: auto;
  }
 .content .lContent p{
    text-align: left;
   padding-left: 5px;
    max-width: 110px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
.content .rContent p{
    max-width: 200px;
    padding-right: 5px;
    text-align: right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .dig2Content{
    text-align: left;
    padding-left: 5px;
    margin: 10px 0;
  }
</style>
