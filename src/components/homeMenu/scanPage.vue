<template>
<div>
  <div v-for="(item, index) in Items" :key="index" style="border:1px solid gainsboro;margin-top: 5px;">
    <van-swipe-cell>
      <div class="content" style="display: flex;justify-content: space-between;margin: 0 5px" @click="showDes(item.TaskDescription)">
        <div class="lContent">
          <p>任务名称: {{item.BillName}}</p>
          <p>任务类型: {{tesktype[item.TaskTypeID]}}</p>
        </div>
        <div>
          <p>频率值:{{item.CycleValue}}</p>
          <p>执行频率:{{item.CycleName}}</p>
        </div>
        <div class="rContent">
          <p>作业状态:{{tesktype[item.State]}}</p>
          <p>任务类型名称:{{item.TaskTypeName}}</p>
        </div>
      </div>
      <span slot="right">
              <van-button square type="primary" @click="startflow(item.ID)">新建</van-button>
            </span>
    </van-swipe-cell>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
  import { Dialog } from 'vant';
  import api from "../../axios/api";

  export default {
  data(){
    return{
      ID:'',
      tesktype:['周期任务','临时任务'],
      Items:[],
    }
  },
  methods:{
    showDes(mes){
      Dialog.alert({
        title: '描述',
        message: '作业描述:'+mes
      }).then(() => {
        // on close
      });
    },
    getEmpTaskByQRCoder(){
      this.$get(api.getEmpTaskByQRCoder+this.ID).then(res=>{
        console.log('任务返回值:',res.data)
        if(res.data.state===200){
        if(res.data.data.length===0){
         this.$router.push({
           name:'historyPage',
           query:{
             ID:this.ID
           }
         })
        }else {
          this.Items=res.data.data
        }
        }
        else{
          Notify(res.data.msg)
        }
      })

    },//获取任务
  },
  created(){
    this.ID = this.$route.query.ID
    this.getEmpTaskByQRCoder()
  }
}
</script>

<style scoped>

</style>
