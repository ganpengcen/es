<template>
  <div style="overflow: hidden">
    <div>
      <div>
        <p style="height: 35px;line-height: 35px;color: #00AAAA">
          <span style="float: left;margin-left: 10px" @click="totextApply"><van-icon name="arrow-left">返回</van-icon></span>
          <span style="float: right;margin-right: 10px" @click="editbill">修改</span>
        </p>
        <div style="">
          <van-field v-model="opreatebill.BillName" label="作业名称" required   placeholder="请输入会议主题">
          </van-field>
          <van-field label="审批流程" required   placeholder="请选择审批流程">
            <el-select v-model="opreatebill.MasterID"  slot="input" size="small">
              <el-option v-for="i,b in MasterSelect" :key="i.MasterID" :value="i.MasterID" :label="i.Name"></el-option>
            </el-select>
          </van-field>
          <van-field label="作业流程" required   placeholder="请选择作业流程">
            <el-select v-model="opreatebill.OpreationID"  slot="input" size="small">
              <el-option v-for="i,b in OpreationSelect" :key="i.ID" :value="i.ID" :label="i.Name"></el-option>
            </el-select>
          </van-field>
          <van-field  v-model="opreatebill.BillLong" label="作业时长" required   placeholder="请输入作业时长">
          </van-field>
          <van-field  label="开始时间" required>
            <van-datetime-picker v-model="opreatebill.StartTime" v-if="flag1"
                                 type="datetime" slot="input" :item-height="20" :visible-item-count="3"  @confirm="confirm1"></van-datetime-picker>
            <div slot="input" v-if="!flag1" ><span style="margin-left:20px">{{MeetingDate1}}</span><i @click="changeflag1" class="el-icon-more-outline" style="font-size: 15px;margin-left: 10px"></i></div>
          </van-field>
          <van-field label="结束时间" required   placeholder="请输入结束时间">
            <van-datetime-picker v-model="opreatebill.EndTime" v-if="flag2"
                                 type="datetime" slot="input" :item-height="20" :visible-item-count="3"  @confirm="confirm2"></van-datetime-picker>
            <div slot="input" v-if="!flag2" ><span style="margin-left:20px">{{MeetingDate2}}</span><i @click="changeflag2" class="el-icon-more-outline" style="font-size: 15px;margin-left: 10px"></i></div>

          </van-field>
          <van-field  label="组织架构" required>
            <el-cascader  slot="input"  size="small" :props="prp" :options="options" style="width:205px" v-model="opreatebill.Org" clearable @change="handleChange"></el-cascader>
          </van-field>
          <van-field label="作业流程" required   placeholder="请输入会议主题">
            <el-select v-model="opreatebill.PrincipalEmployeeID"  slot="input" size="small">
              <el-option v-for="item, index in PrincipalEmployeeSelect" :label="item.CNName" :value="item.ID" :key="item.ID"></el-option>
            </el-select>
          </van-field>
          <van-field v-model="opreatebill.Description" label="申请描述" required   placeholder="请输入申请描述">
          </van-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const GUID ='00000000-0000-0000-0000-000000000000'
  import api from "../../axios/api";
  import Vue from 'vue';
  import { Field } from 'vant';
  Vue.use(Field);
  export default {
    data(){
      return{
        ID:'',
        MeetingDate1:'',
        MeetingDate2:'',
        flag1:false,
        flag2:false,
        Principal2:[],
        personPrincipal:'',
        opreatebill:{},
        MasterSelect:[],
        OpreationSelect:[],
        PrincipalEmployeeSelect:[],
        options:[],
        Org:[],
        prp:{
          checkStrictly: true,
          value: 'ID',
          label:'OrgName',
          children:'Children'
        },
      }
    },
    methods: {
      changeflag1(){
        this.flag1=true
      },
      changeflag2(){
        this.flag2=true
      },
      confirm1 (date) {
        this.flag1 = false
        let fYear = date.getFullYear()
        let Month = date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth();
        let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let Hours = date.getHours() <10 ? '0' +  date.getHours():  date.getHours()
        let Minutes = date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes()
        let Seconds = '20'
        this.MeetingDate1 = fYear+'-'+Month+'-'+Day+' '+ Hours+':'+Minutes+':'+Seconds
        console.log('当前点击时间',this.MeetingDate1)
      },
      confirm2 (date) {
        this.flag2 = false
        let fYear = date.getFullYear()
        let Month = date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth();
        let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let Hours = date.getHours() <10 ? '0' +  date.getHours():  date.getHours()
        let Minutes = date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes()
        let Seconds = '20'
        this.MeetingDate2 = fYear+'-'+Month+'-'+Day+' '+ Hours+':'+Minutes+':'+Seconds
        console.log('当前点击时间',this.MeetingDate2)
      },
      opreatebillGetmodel(){
        this.$get(api.opreatebillGetmodel+this.ID).then(res=>{
          console.log('模型返回值',res)
          if(res.data.state===200){
            this.opreatebill=res.data.data
            let da=[]
            this.MeetingDate1=res.data.data.StartTime
            this.MeetingDate2=res.data.data.EndTime
            let org = res.data.data.OrgID
            this.$get(api.getparents+org).then(rs=>{
              console.log('父级返回值:',rs.data.data)
              if(rs.data.state===200){
                rs.data.data.forEach(i=>{
                  da.unshift(i.ID)
                })
              }
              console.log('da值',da)
              this.handleChange(da)
            })
            da.unshift(org)
            this.$set(this.opreatebill,'Org',da)
            console.log('this.opreatebill',this.opreatebill)
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      }, //获取作业单模型
      editbill(){
        let param={
          "ID": this.ID,
          "BillName": this.opreatebill.BillName,
          "OpreationID":this.opreatebill.OpreationID,
          "StartTime": this.opreatebill.StartTime,
          "EndTime": this.opreatebill.EndTime,
          "BillLong": this.opreatebill.BillLong,
          "PrincipalEmployeeID":this.opreatebill.PrincipalEmployeeID,
          "Description": this.opreatebill.Description,
          "MasterID": this.opreatebill.MasterID,
        }
        console.log('需改参数:',param)
        this.$post(api.opreatebillEditbill,param).then(res=>{
          if(res.data.state===200){
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },  //修改
      totextApply(){
        this.$router.push({
          path:'/textApply'
        })
      },
      formDate(data){
        if(data) {
          let year = data.getFullYear()
          let mouth = (data.getMonth() + 1) > 10 ? (data.getMonth() + 1) : '0' + (data.getMonth() + 1)
          let day = data.getDate() > 10 ? data.getDate() : '0' + data.getDate()
          let hour = data.getHours() > 10 ? data.getHours() : '0' + data.getHours()
          let seconds = data.getSeconds()
          let minute = data.getMinutes()
          let d = year + '-' + mouth + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
          return d
        } else {
          return false
        }
      },  //格式hua日期
      dateChange1(value){
        this.opreatebill.StartTime= this.formDate(value)
        console.log('格式化时间',this.opreatebill.StartTime)
      },//日期改变
      dateChange2(value){
        this.opreatebill.EndTime= this.formDate(value)
        console.log('格式化时间',this.opreatebill.EndTime)
      },//日期改变
      getMasterSelect(){
        this.$get(api.getFlowMasterSelector+'1').then(res=>{
          console.log('MasterSelect返回值:',res)
          if(res.data.state===200){
            this.MasterSelect=res.data.data
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },//获取审批流程选择器
      getOpreationSelect(){
        this.$get(api.getOpreationSelectorByUser).then(res=>{
          console.log('getOpreationSelect返回值:',res)
          if(res.data.state===200){
            this.OpreationSelect=res.data.data
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },//获取作业流程选择器
      getTree() {
        this.options = []
        this.$get(api.gettree +'/'+ GUID).then(res=>{
          console.log('树返回值:res',res)
          if(res.data.state === 200) {
            this.options = res.data.data
            console.log('options',this.options)
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },//获取组织架构树
      handleChange(value) {
        let da = ''
        console.log('value',value)
        if(value) {
          if (value.length > 0) {
            da = value[value.length - 1]
            this.$get(api.getemplist +'/'+ da).then(res => {
              console.log('节点改变返回值:',res)
              if (res.data.state === 200) {
                console.log('节点改变:', res)
                this.PrincipalEmployeeSelect=res.data.data
//            this.selectOption = res.data.Data
              }
            })
          } else {
            return false;
          }
        }
      },//树节点改变
      addnew(){
        let param={
          "BillName": this.opreatebill.BillName,
          "OpreationID":this.opreatebill.OpreationID,
          "StartTime": this.formDate(this.opreatebill.StartTime),
          "EndTime": this.formDate(this.opreatebill.EndTime),
          "BillLong": this.opreatebill.BillLong,
          "PrincipalEmployeeID":this.opreatebill.PrincipalEmployeeID,
          "Description": this.opreatebill.Description,
          "MasterID": this.opreatebill.MasterID,
        }
        console.log('新建参数:',param)
        this.$post(api.addnewOpreatebill,param).then(res=>{
          if(res.data.state===200){
            this.$message({
              type:'success',
              message:'新建成功'
            })
            this.$router.push({
              path:'/textApply'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },//新建作业申请

    },
    created(){
      this.ID=this.$route.query.ID
      this.getTree()
      this.opreatebillGetmodel()
      this.getMasterSelect()
      this.getOpreationSelect()
    }
  }
</script>

<style>

</style>
