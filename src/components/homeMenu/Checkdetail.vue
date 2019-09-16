<template>
  <div>
    <div class="checkdetail">
      <van-tabs type="card">
        <van-tab title="设备设施">
          <div v-for="item in dataarrs" :key="item.KeyID">
            <van-swipe-cell v-if="item.SubTypeName == '设备设施'" :on-close="onClose"  >
              <div class="station" @click="taskResult(item.SubResultID,item.BillID)">
                <div class="station1">
                  <p>设备设施名：{{item.SubName}}</p>
                  <p>电话：{{item.PrincipalTel}}</p>
                </div>
                <div class="station2">
                  <p>负责人：{{item.Principal}}</p>
                  <p>风控项：{{item.DangerName}}</p>
                  <p>风险等级：{{item.DangerLevel}}</p>
                </div>
              </div>
              <van-button square slot="right" type="danger" text="删除" />
            </van-swipe-cell>
          </div>
        </van-tab>
        <van-tab title="岗位">
          <div v-for="item in dataarrs" :key="item.KeyID">
            <van-swipe-cell v-if="item.SubTypeName == '岗位'" :on-close="onClose" >
              <div class="station" @click="taskResult(item.SubResultID,item.BillID)">
                <div class="station1">
                  <p>岗位名：{{item.SubName}}</p>
                  <p>电话：{{item.PrincipalTel}}</p>
                </div>
                <div class="station2">
                  <p>负责人：{{item.Principal}}</p>
                  <p>风控项：{{item.DangerName}}</p>
                  <p>风险等级：{{item.DangerLevel}}</p>
                </div>
              </div>
              <van-button square slot="right" type="danger" text="删除" />
            </van-swipe-cell>
          </div>
        </van-tab>
        <van-tab title="作业" style="border-right:none">
          <div v-for="item in dataarrs" :key="item.KeyID">
            <van-swipe-cell v-if="item.SubTypeName == '作业'" :on-close="onClose">
              <div class="station"  @click="taskResult(item.SubResultID,item.BillID)">
                <div class="station1">
                  <p>作业名：{{item.SubName}}</p>
                  <p>电话：{{item.PrincipalTel}}</p>
                </div>
                <div class="station2">
                  <p>负责人：{{item.Principal}}</p>
                  <p>风控项：{{item.DangerName}}</p>
                  <p>风险等级：{{item.DangerLevel}}</p>
                </div>
              </div>
              <van-button square slot="right" type="danger" text="删除" />
            </van-swipe-cell>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import api from "../../axios/api";
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      id: "", //根据任务详情传过来的id
      dataarrs: [], //获取的数据
      SubResultID:'',
    };
  },
  created() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.gettasksubover();
  },
  methods: {
    taskResult(e,b){
      this.$router.push({
        name:'Taskresult',
        query:{
          resultId:e,
          BillID:b
        }
      })
    },
    //根据结果id删除结果
    // delate(e){
    //   this.SubResultID=e;
    //   this.$get(api.delsubresult+'/'+this.SubResultID).then(res=>{
    //     if(res.data.state==200){
    //       Toast('删除成功')
    //     }else{
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // },
    //拿数据方法
    gettasksubover() {
      this.$get(api.gettasksubover + "/" + this.id).then(res => {
          console.log(res);
        if (res.data.state == 200) {
          this.dataarrs = res.data.data;
          // console.log(this.dataarrs);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            this.$message.error('当前单据状态属于已完成状态，无法删除检查结果！');
            instance.close();
          }).catch(() => {
  // on cancel
});
          break;
      }
    }
  }
};
</script>


<style>
.checkdetail {
  margin-top: 10px;
}
.checkdetail .van-tabs__nav--card {
  border-radius: 5px;
  border-color: #409eff;
}
.checkdetail .van-tabs__nav--card .van-tab.van-tab--active {
  background-color: #409eff;
  color: #fff;
}
.checkdetail .van-tabs__nav--card .van-tab {
  border-right: 1px solid #409eff;
  color: #409eff;
}
.station {
  border-bottom: 1px solid #ccc;
  padding: 0 5px;
  margin-top: 5px;
}
.station1,
.station2 {
  display: flex;
  justify-content: space-between;
}
</style>


<style scoped>
</style>


    
