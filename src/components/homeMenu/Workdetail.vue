<template>
  <div>
    <div class="box">
      <p>
        <span>作业名称</span>
        <span>{{workdata.OpreationName}}</span>
      </p>
      <p>
        <span>开始时间</span>
        <span>{{workdata.StartTime}}</span>
      </p>
      <p>
        <span>结束时间</span>
        <span>{{workdata.EndTime}}</span>
      </p>
      <p>
        <span>当前作业状态</span>
        <span>{{workdata.StateName}}</span>
      </p>
      <p>
        <span>负责人</span>
        <span>{{workdata.PrincipalEmployeeName}}</span>
      </p>
    </div>
    <div class="bottom">
      <div class="lineoftime">
        <p>作业内容描述：</p>
        <div style="min-height: 350px;width: 90%;">
          <el-steps direction="vertical" finish-status="success" :active="this.jj">
            <el-step class="aaaaa" style="float: left" :title="item.PointName"
              v-for="(item, index) of this.workdata.BillFlows" :key="index">
              <div slot="description" style="float: left; width: 90%;">
                <div class="hand-info" style="width: 60%;display: inline-block">
                  <span>
                    <span>执行岗位:</span>
                    {{ item.PostName }}
                  </span>
                  <table v-for="(item2,index) in item.detials" :key="index" style="width:250px">
                    <thead>
                      <tr>
                        <th>执行人</th>
                        <th>执行结果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{item2.FlowEmployeeName}}</td>
                        <td>{{item2.FlowMemo}}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>

                <div>
                  <p class="workState">
                    <span v-if="item.FlowUEModel.FinishEnable" @click="changeDialog(item,1)">完成</span>
                    <span v-if="item.FlowUEModel.StopEnable" @click="changeDialog(item,2)">作业终止</span>
                    <span v-if="item.FlowUEModel.ReBackEnable" @click="changeDialog(item,3)">作业回退</span>
                  </p>
                  <div class="motaikuang">
                    <el-dialog title="添加备注" :visible.sync="dialogFormVisible" width="75%">
                      <input type="text" placeholder="在此输入备注" v-model="inputmsg">
                      <p>
                        <span @click="addRemark">确定</span>
                        <span @click="cancel">取消</span>
                      </p>
                    </el-dialog>
                  </div>
                </div>

              </div>
              <div class="rightline" slot="description">
                
                <div class="liucheng_box">
                  
                   
                  <div  :class="item.FlowUEModel.RightLien ? 'quan_true':'quan'"><!-- 圈 -->
                  </div>
                   <div v-show="index != workdata.BillFlows.length - 1"  :class="index==workdata.BillFlows.length - 1?'xian_true':workdata.BillFlows[index+1].FlowUEModel.RightLien  ? 'xian_true': 'xian'"></div><!--线 -->
                    
                </div>
              </div>
            </el-step>
          </el-steps>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "../../axios/api";
  export default {
    data() {
      return {
        id: "", //作业单id
        workdata: {}, //根据作业id拿到的作业的详情数据
        arrs: [],
        jj: 0, //判断该第几步的线变绿
        jj2: 0,
        dialogFormVisible: false, //模态框显示与关闭
        inputmsg: '', //模态框中的input的备注信息
        OpreationFlowID: "",
        FlowResult: 0,
      };
    },
    created() {
      // console.log(this.$route.query);
      this.id = this.$route.query.id;
      this.totolCount = this.$route.query.AllCount;

      // console.log(this.state);
      this.jj2 = this.jj;
    },
    mounted() {
      // this.$refs.marks.focus()
      this.getopreateflowmodel();
    },
    methods: {
      //根据作业单ID，获取带处理节点的单据模型
      getopreateflowmodel() {
        this.$get(api.getopreateflowmodel + "/" + this.id).then(res => {
          if (res.data.state == 200) {
            this.workdata = res.data.data;
            console.log("getopreateflowmodel", res)
            this.getActive();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }, //获取jj的值
      getActive() {
        for (var j = 0; j < this.workdata.BillFlows.length; j++) {
          if (this.workdata.BillFlows[j].FlowUEModel.LeftLine) {
            this.jj = j + 1;
          }
        }
      },
      //点击模态框，让模态框状态变为开
      changeDialog(item, val) {
        // console.log("item"+val,item)
        this.FlowResult = val;
        this.OpreationFlowID = item.OpreationFlowID;
        this.dialogFormVisible = true;
      },
      //关闭模态框
      cancel() {
        this.dialogFormVisible = false;
      },
      //点击确定提交备注信息
      addRemark() {
        let params = {
          "BillID": this.id,
          "OpreationFlowID": this.OpreationFlowID,
          "FlowResult": this.FlowResult,
          "FlowMemo": this.inputmsg
        };
        this.$post(api.billflowset, params).then(res => {
          if (res.data.state = 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getopreateflowmodel();
          } else {
            this.$message.error(res.data.msg)
          }
        });
        // if(this.jj)

        this.dialogFormVisible = false; //关闭模态框
        this.inputmsg = ''; //清空input框对的备注信息
      }
    }
  };

</script>



<style>
  .lineoftime>p {
    text-align: left;
    padding-left: 10px;
    line-height: 30px;
    font-size: 12px;
  }

  .bottom {
    display: flex;
  }

  .lineoftime {
    flex: 10;
  }

  .lineoftime .el-step__head.is-wait,
  .rightline .el-step__head.is-wait {
    color: #000000;
    border-color: #000000;
  }

  .lineoftime .el-step__title.is-wait,
  .lineoftime .el-step__description.is-wait {
    color: #000000;
  }

  .lineoftime .el-step__icon {
    border-width: 1px;
  }

  .rightline {
    flex: 1
  }

  .rightline .el-step__title.is-wait,
  .lineoftime .el-step__description.is-wait {
    color: #000000;
  }

  .rightline .el-step__icon {
    border-width: 1px;
  }

  .workState span {
    padding: 3px 6px;
    background-color: #409EFF;
    color: white;
    font-size: 10px;
    border-radius: 3px;
  }

  .motaikuang .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }

  .motaikuang .el-dialog__title {
    color: #000;
  }

  .motaikuang input {
    padding: 3px 1px;
    width: 100%;
    border: none;
    border-bottom: 1px solid #409EFF;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .motaikuang p {
    overflow: hidden;
  }

  .motaikuang p>span {
    float: right;
    color: #409EFF;
    font-size: 16px;

  }

  .motaikuang p>span:nth-child(2) {
    margin-right: 30px;

  }

</style>


<style scoped>
  .rightline {
    position: absolute;
    right: 0;
    height: 100%;
  }

  .box p {
    display: flex;
    line-height: 30px;
    font-size: 12px;
  }

  .box>p>span:nth-child(1) {
    flex: 5;
    text-align: left;
    padding-left: 10px;
  }

  .box>p>span:nth-child(2) {
    flex: 7;
    text-align: left;
  }




  .liucheng_box {
      position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  .quan {
    border-radius: 50%;
    background: #ddd;
    width: 6vw;
    height: 6vw;

  }

  .xian {
    height: calc(100% - 6vw);
    width: 3px;
    background: #ddd;
  }

  .quan_true {
    border-radius: 50%;
    background: orange;
    width: 6vw;
    height: 6vw;
    
  }

  .xian_true {
    height: calc(100% - 6vw);
    width: 3px;
    background: orange;
  }

</style>
