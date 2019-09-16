<template>
  <div class="wrapper" ref="wrapper">
        <div style="display: flex;justify-content: space-between;border: 1px solid rgba(133,133,133,0.2)">
          <i class="el-icon-circle-plus-outline"
             style="font-size: 20px;line-height: 25px;float: right;margin-right: 15px;padding: 5px" @click="toAddPage"></i>
        </div>
        <div style="clear: both"></div>
          <scroller :on-refresh="refresh" ref="my_scroller"
                    :on-infinite="infinite" style="margin-top:30px">
             <div v-for="(item, index) in Items" :key="index" style="border:1px solid gainsboro;margin-top: 5px;">
                  <van-swipe-cell>
              <div class="content" style="display: flex;justify-content: space-between;margin: 0 5px">
                <div class="lContent">
                  <p>作业名称: {{item.BillName}}</p>
                  <p>作业时长: {{item.BillLong}}</p>
                </div>
                <div>
                  <p>作业发起人 {{item.CreateMan}}</p>
                  <p>作业责任人 {{item.PrincipalEmployeeName}}</p>
                </div>
                <div class="rContent">
                  <p>作业描述:{{item.Description}}</p>
                  <p>作业状态: <span style="color: red">{{state[item.State]}}</span></p>
                </div>
              </div>
              <span slot="right">
              <van-button square type="primary" @click="startflow(item.ID)">发起审批</van-button>
              <van-button square type="danger" @click="opreatebillApprove(item.ID)">审核</van-button>
               <van-button square type="info" @click="toChangePage(item.ID)">修改</van-button>
                <van-button square type="danger" @click="deleted(item.ID)">删除</van-button>
            </span>
            </van-swipe-cell>
             </div>
          </scroller>
          <!--<div class="bottom" v-if="false">-->
            <!--<p style="text-align: center">已获取所有申请</p>-->
          <!--</div>-->
        <div class="addWrapper" v-if="dg1">
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from "../../axios/api";
  import { Dialog } from 'vant';
  import { Notify,Radio  } from 'vant';
  export default {
    data() {
      return {
        state:['待检查完成','待审批','审批拒绝','审批撤销','审批中','审批通过','已审核','作废','申请中','已验收','已终止','已完成','已退回'],
        page:{
          index:1,
          size:13,
          total:1
        },
        index:0,
        isFirst:true,
        Items:[],
        dg1:false,
      }
    },
    methods:{
      toAddPage(){
        this.$router.push({
          path:'/textApply/addText'
        })
      },  //新建
      deleted(ID){
        Dialog.confirm({
          title: '提示',
          message: '你将删除该作业是否确认?'
        }).then(() => {
          this.$get(api.opreatebillDelbill+ID).then(res=>{
            if(res.data.state===200){
              this.getlist()
              this.$message({
                type:'success',
                message:'删除成功'
              })
            }else {
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消'
          })
        });
      },//删除作业
      toChangePage(ID){
        console.log('改变')
        this.$router.push({
          name:'changeText',
          query:{
            ID:ID
          }
        })
      },  //修改
      startflow(ID){
        this.$get(api.startflow+ID).then(res=>{
          if(res.data.state===200){
            this.$message({
              type:'success',
              message:'发起审批成功'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },  //审批
      throttle2(fn, delay) {
        let preTime = Date.now()
        return function() {
          const context = this
          let args = arguments
          let doTime = Date.now()
          if (doTime - preTime >= delay) {
            fn.apply(context, args)
            preTime = Date.now()
          }
        }
      },
      refresh(){
        this.page.index=1
        console.log('refresh')
        let param={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": "",
          "OrderString": "",
          "ToExcel": true
        }
        console.log('刷新参数',param)
        this.$post(api.getOpreateBilllist,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.state===200){
            this.Items=res.data.data.Data
            console.log('items',this.Items)
            this.page.total=res.data.data.Items
            this.$refs.my_scroller.finishPullToRefresh();
          }
        })
      },  //下拉刷新
      infinite(done){
         console.log('加载')
         console.log('全部',this.isAll)
          if(!this.isAll){
              this.$refs.my_scroller.finishInfinite(3);
            return;
          }
          console.log(this.page.total)
          console.log('this.isALl',this.isAll)
           setTimeout(()=>{
  let param = {
    "PageSize": this.page.size,
    "PageIndex": this.page.index,
    "KeyWord": "",
    "Query": "",
    "OrderString": "",
    "ToExcel": true
  }
  console.log('上拉加载参数', param)
  this.$post(api.getOpreateBilllist, param).then(res => {
    console.log('分页返回值:', res)
    if (res.data.state === 200) {
      this.page.index++
      res.data.data.Data.forEach(i => {
        this.Items.push(i)
      })
      console.log('items', this.Items)
      done()
    }
  })
},300)
      },  //上拉加载
      getlist(){
        console.log('huoqu')
        let param={
          "PageSize": this.page.size,
          "PageIndex": 0,
          "KeyWord": "",
          "Query": "",
          "OrderString": "",
          "ToExcel": true
        }
        this.$post(api.getOpreateBilllist,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.state===200){
            this.Items=res.data.data.Data
            console.log('items',this.Items)
            this.page.total=res.data.data.Items
          }
        })
      },//获取作业申请列表
      opreatebillApprove(ID){
        this.$get(api.opreatebillApprove+ID).then(res=>{
          if(res.data.state===200){
            this.$message({
              type:'success',
              message:'审核成功'
            })
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },//业务单据审核
    },
    created(){
//      this.getlist()
      this.refresh()
    },
    computed: {
      isAll: function () {
       return (this.page.total>this.Items.length)
      }
    }
  }
</script>

<style scoped>
.table{
  width: 98%;
  margin: 0 auto;
  height: 565px;
}
  .bottom{
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-color: rgba(122,122,122,0.1);
  }
  .addWrapper{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 5px;
    z-index: 100;
    border: 1px solid red;
    background-color: rgba(122,122,122,0.8);
  }
  .content p{
    max-width: 120px;
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
.content div{
  flex:1;
}
.addWrapper  .footerButton{
  position: absolute;bottom: 10px;
  right: 10px;
}
</style>
