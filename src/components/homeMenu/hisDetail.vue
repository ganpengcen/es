<template>
  <div>
    <p style="height: 35px;line-height: 35px;color: #00AAAA">
      <span style="float: left;margin-left: 10px;font-size: 16px" @click="tohis"><van-icon name="arrow-left">返回</van-icon></span>
    </p>
    <div style="text-align: left;margin-left: 10px;" class="main">
      <p>任务名称:{{item.TaskName}}</p>
      <p>职员名称:{{item.EmployeeName}}</p>
      <p>开始时间:{{item.StartTime}}</p>
      <p>预计完成时间:{{item.EndTime}}</p>
      <p>风险点名:{{item.DangerPointName}}</p>
      <p>检查主体总数:{{item.SubCount}}</p>
      <p>已检查主体数:{{item.SubCheckedCount}}</p>
      <p>任务类型:{{item.TaskType}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from "../../axios/api";
export default {
  data(){
    return{
      item:{},
      parentID:'',
      ID:'',
    }
  },
  methods:{
    getModel(){
      this.$get
    },
    tohis(){
      this.$router.push({
        name:'historyPage',
        query:{
          ID:this.parentID
        }
      })
    },

  },
  created(){
    this.ID=this.$route.query.ID
    this.parentID=this.$route.query.parentID
    this.getModel()
  },
}
</script>

<style>
.main p{
  height: 35px;
  font-size: 16px;
  line-height: 35px;
}
</style>
