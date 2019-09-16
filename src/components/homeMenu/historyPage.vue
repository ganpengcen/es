<template>
<div>
  <p v-if="Items.length==0" style="height: 470px;line-height: 40px;color: rgba(155,155,155,0.9)">暂无历史任务</p>
  <div v-for="(item, index) in Items" :key="index" style="border:1px solid gainsboro;margin-top: 5px;" @click="showDetail(item.BillID)">
    <van-swipe-cell>
      <div class="content" style="display: flex;margin: 0 5px">
        <div class="lContent">
          <p>任务名称: {{item.TaskName}}</p>
          <p>职员名称:{{item.EmployeeName}}</p>
        </div>

        <div class="rContent">
          <p>任务状态:{{tesktype[item.State]}}</p>
          <p>风险点名称:{{item.DangerPointName}}</p>
        </div>
        <div>
          <p>开始时间:{{item.StartTime}}</p>
          <p>预计完成时间:{{item.EndTime}}</p>
        </div>
      </div>
      <span slot="right">
              <van-button square type="primary" @click="startflow">新建</van-button>
            </span>
    </van-swipe-cell>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import api from "../../axios/api";
  export default {
    data(){
      return{
        Items:[],
        ID:'',
        tesktype:['周期任务','临时任务'],
        State:['待检查完成','待审核','审核拒绝','审批撤销','审批中','审批通过','已审核','作废','申请中','已验收','已终止','已完成','已回退']
      }
    },
    methods:{
      showDetail(ID){
        this.$router.push({
          path:'/MyWork/Checkdetail',query:{id:ID}
        })
      },
      startflow(){
        this.$router.push({
          path:'/TemporaryTask'
        })
      },
      getTaskBillMastersOverByQRCoder(){
        this.$get(api.getTaskBillMastersOverByQRCoder+this.ID).then(res=>{
          console.log('历史返回值:',res)
          if(res.data.state===200){
            this.Items=res.data.data
          }
          else{
            Notify(res.data.msg)
          }
        })
      },//历史
    },
    created(){
      this.ID=this.$route.query.ID
      this.getTaskBillMastersOverByQRCoder()
    }
  }
</script>

<style>
  .content div{
    flex:1;
  }
  .content p{
    max-width: 120px;
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
