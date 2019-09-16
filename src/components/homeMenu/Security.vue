<template>
  <div class="TrainingManage-wrap">
    <div style="display: flex;justify-content: space-between">
    <i class="el-icon-refresh-right" @click="getdms" style="font-size: 20px;line-height: 25px;padding: 5px"></i>
    <i class="el-icon-circle-plus-outline" style="font-size: 20px;line-height: 25px;float: right;margin-right: 15px;padding: 5px" @click="adddm"></i>
   </div>
    <div style="clear: both"></div>
    <div class="tableMain">
      <div>
        <scroller :on-refresh="refresh" ref="my_scroller"
                  :on-infinite="infinite" style="margin-top:30px">
        <div v-for="(item, index) in table" :key="index" style="border:1px solid gainsboro;margin-top: 5px">
          <van-swipe-cell>
            <div class="content" style="display: flex;justify-content: space-between">
              <div class="lContent">
                <p>会议主题:{{item.Motif}}</p>
                <p>会议日期:{{item.MeetingDate}}</p>
              </div>
              <div>
                <p>地点:{{item.Site}}</p>
              </div>
              <div class="rContent">
                <p>参会人员:{{item.EmployeeS}}</p>
                <p>主持:{{item.MeetingMaster}}</p>
              </div>
            </div>
            <span slot="right">
              <van-button square type="primary" @click="showdetail(item.ID)">详情</van-button>
              <van-button square type="primary" @click="getmodel(item.ID)">修改</van-button>
              <van-button square type="danger" @click="deleted(item)">删除</van-button>
            </span>
          </van-swipe-cell>
        </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../axios/api";
  import { Notify,Radio  } from 'vant';
  export default {
    data () {
      return {
        detail:false,
        dicData:'',
        changetype:[],
        header:{
          "Token":localStorage.token,
          "AccountID":localStorage.AccountID,
        },
        parentId:'',
        page:{
          size:15,
          index:1,
          total:1
        },
        table:[],
        type:[],
        dataFlag:true,
        fileList: [],
        upFileList: [],
        currentDate: new Date(),
        newDialog:false,
        changeDialog:false,
        newData:{},
        MeetingDate:'',
        itemd:{}
      }
    },
    computed: {
      isAll: function () {
        return (this.page.total>this.table.length)
      }
    },
    methods: {
      getdms() {
        this.table= []
        let param = {
          "PageSize": 100,
          "PageIndex": 0,
          "KeyWord": "",
          "Query": {
            "Motif": ""
          },
          "OrderString": "",
          "ToExcel": true
        }
        this.$post(api.getdms,param).then(res=>{
          if(res.data.state ===200){
            console.log(res.data.data.Data)
            this.table = res.data.data.Data
            console.log('table',this.table)
          } else {
            Notify(res.data.msg)
          }
        })
      }, //获取分页详情
      refresh(){
        this.page.index=1
        console.log('refresh')
        let param={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": {
            "Motif": ""
          },
          "OrderString": "",
          "ToExcel": false
        }
        console.log('刷新参数',param)
        this.$post(api.getdms,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.state===200){
            this.table=res.data.data.Data
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
          let param={
            "PageSize": this.page.size,
            "PageIndex": this.page.index,
            "KeyWord": "",
            "Query": {
              "Motif": ""
            },
            "OrderString": "",
            "ToExcel": false
          }
          console.log('上拉加载参数', param)
          this.$post(api.getdms, param).then(res => {
            console.log('分页返回值:', res)
            if (res.data.state === 200) {
              this.page.index++
              res.data.data.Data.forEach(i => {
                this.table.push(i)
              })
              console.log('items', this.Items)
              done()
            }
          })
        },300)
      },  //上拉加载
      changeflag (){
        this.dataFlag = true
      },
      showdetail(ID) {
        this.$router.push({
          name:'securityDetail',
          query:{
            ID:ID
          }
        })
      },
      getmodel(ID) {
        this.$router.push({
          name:'changeSecurity',
          query:{
            ID:ID
          }
        })
//        this.parentId = ID
//        let param = {
//          "DefinedType": 6,
//          "BusinessID": ID
//        }
//        console.log('获取用户自定义项')
//        this.$post(api.getitems, param).then(res=>{
//          console.log(res)
//          if(res.data.state===200){
//            this.getdm(ID)
//            this.getFile(ID)
//            this.changetype = res.data.data;
//            this.changeDialog = true
//          } else {
//            Notify(res.data.msg)
//          }
//        })
      },  //获取用户自定义详情
      getFile (ID) {
        this.fileList = []
        this.upFileList = []
        this.$get(api.getfiles+ID).then(res=> {
          console.log(res)
            if(res.data.state === 200){
              console.log('获取文件成功')
              console.log(res)
              res.data.data.forEach(item => {
                this.fileList.push({
                  name:item.FileTitle,
                  url:item.FileUrl,
                  ID:item.ID
                })
                this.upFileList.push({
                    "FileTitle":item.FileTitle,
                    "FileUrl":item.FileUrl,
                    "FileType":item.FileType,
                  })
              })
              console.log('文件列表')
              console.log(this.upFileList)
              console.log(this.fileList)
          } else {
              Notify(res.data.msg)
            }
        })
      },//获取用户上传文件详情
      fileSuccess(res,file,filelist) {
        console.log('进入文件上传')
        console.log('res',res)
        console.log(file)
        console.log(filelist)
       if(res.state===200){
         console.log('文件上传成功')
         this.upFileList.push({
          "FileTitle":file.name,
           "FileUrl":file.response.data,
           "FileType":file.raw.type,
         })
         console.log('up',this.upFileList)
       } else {
        this.$message({
          type:'error',
          message:res.msg
        })
       }
      },  //文件上传
      deleted(ID) {
        console.log(ID)
        this.$get(api.deldm+ID.ID).then(res=>{
          console.log(res)
          if(res.data.state === 200){
            this.getdms()
          }  else {
            Notify(res.data.msg)
          }
        })
      },//删除
      confirm (date) {
        this.dataFlag = false
        let fYear = date.getFullYear()
        let Month = date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth();
        let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let Hours = date.getHours() <10 ? '0' +  date.getHours():  date.getHours()
        let Minutes = date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes()
        let Seconds = '20'
        this.MeetingDate = fYear+'-'+Month+'-'+Day+' '+ Hours+':'+Minutes+':'+Seconds
        console.log('当前点击时间',this.MeetingDate)
      }, //时间
      confirm2 (date) {
        this.dataFlag = false
        let fYear = date.getFullYear()
        let Month = date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth();
        let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let Hours = date.getHours() <10 ? '0' +  date.getHours():  date.getHours()
        let Minutes = date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes()
        let Seconds = '20'
        this.MeetingDate = fYear+'-'+Month+'-'+Day+' '+ Hours+':'+Minutes+':'+Seconds
        console.log('当前点击时间',this.MeetingDate)
      },
      adddm(){
        this.$router.push({
          path:'/Security/addSecurity'
        })
      },
      adddm2() {
        this.fileList = []
        this.upFileList = []
        this.itemd = []
        this.dataFlag = true
        this.$get(api.getlist+'/6').then(res=>{
          if(res.data.state === 200) {
            this.type = res.data.data
            this.type.forEach(item=>{
              this.$set(item, 'arr', [])
              this.$set(item, 'flag', false)
              this.newDialog = true
              if(item.DataType === 5) {
                let param = {
                  "PageSize": 6,
                  "PageIndex": 0,
                  "KeyWord": "",
                  "Query": item.DictID,
                  "OrderString": "",
                  "ToExcel": true
                }
                this.$post(api.getdicts,param).then(res=>{
                  console.log('词典')
                  item.dic=res.data.data.Data
                  this.arr = item.dic.DictName
                  console.log(this.type)
                })
              }
            })
          } else{
            Notify(res.data.msg)
          }
        })
      }, //新建弹出框，获取自定义项

      handleRemove(file, fileList) {
        console.log(file.ID)
        this.$get(api.delfile+file.ID).then(res=>{
          if(res.data.state === 200){
            console.log('删除成功')
            let len = this.upFileList.length-1
            this.upFileList.splice(len,1)
            this.fileList = fileList
            console.log('un文件:')
            console.log(this.upFileList)
          } else {
            Notify(res.data.msg)
          }
        })
      },
      beforeRemove(file,filelist){
    console.log(filelist)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      newdm () {
        let defie = []
        console.log(this.type)
        this.type.forEach((data)=> {
          console.log(data)
          if (data.DataType === 5) {
            defie.push({
              "DefinedValue": data.arr,
              "DefinedID": data.ID
            })
           }else if(data.DataType===6){
            defie.push({
              "DefinedValue": data.flag,
              "DefinedID": data.ID
            })
           } else {
            defie.push({
                "DefinedValue":  data.DefinedValue,
                "DefinedID": data.ID
              })
          }
          console.log('defie',defie)
        })
        let param ={
          "Motif": this.itemd.Motif,
          "EmployeeS": this.itemd.EmployeeS,
          "MeetingDate": this.MeetingDate,
          "MeetingMaster": this.itemd.MeetingMaster,
          "Site": this.itemd.Site,
          "Content": this.itemd.Content,
          "AttachFiles": this.upFileList,
          "UserDefineds": defie,
        }
        console.log('新建提交时间',this.MeetingDate)
        console.log('参数',param)
        this.$post(api.adddm,param).then(res=>{
          console.log('新建参数',res)
          Notify('新建成功')
           if(res.data.state === 200){
             console.log(res)
             this.getdms()
             this.itemd = []
             this.type = []
             this.fileList = []
             this.upFileList = []
             this.newDialog =false
             this.dataFlag = true
           } else {
             Notify.success(res.data.msg);
          }
        })
      }, //新建会议
      changeDig(ID) {
        this.parentId = ID
        let that = this
        this.$get(api.getlist+'/6').then(res=>{
          if(res.data.state === 200) {
            console.log(res)
            this.type = res.data.data
            that.getdm(ID)
          } else {
            Notify(res.data.msg)
          }
        })
      },
      getdm(ID) {
        this.$get(api.getdm+ID).then(res=>{
         if(res.data.state === 200) {
           this.itemd = res.data.data
           this.MeetingDate = this.itemd.MeetingDate
           console.log('change',this.itemd)
           this.changeDialog= true
           this.dataFlag = false
         }
        })
      },  //获取单条信息
      changedm () {
        console.log(1)
        console.log(this.upFileList)
        let defie = []
        this.changetype.forEach((data)=>{
            defie.push({
              "DefinedValue": data.ItemValue,
              "DefinedID": data.ID
            })
        })
        console.log('自定义数据')
        console.log(defie)
        console.log(this.parentId)
        console.log(this.fileList)
        let param ={
          "ID": this.parentId,
          "Motif": this.itemd.Motif,
          "EmployeeS": this.itemd.EmployeeS,
          "MeetingDate": this.MeetingDate,
          "MeetingMaster": this.itemd.MeetingMaster,
          "Site": this.itemd.Site,
          "Content": this.itemd.Content,
          "AttachFiles": this.upFileList,
          "UserDefineds": defie,
        }
        console.log("param",param)
        console.log('修改提交时间',this.MeetingDate)
        this.$post(api.editdm,param).then(res=>{
          console.log(res)
          if(res.data.state === 200){
            this.changeDialog= false
            this.getdms()
            Notify({
              message: '跟新成功',
              duration: 1000,
              background: '#1989fa'
            });
          } else {
            Notify(res.data.msg)
          }
        })
      },  //修改单条数据
  },
    created () {
      this.refresh()
    }
  }
</script>
<style scoped>
  .TrainingManage-wrap {
    width: 100%;
    height: 100%;
  }
  .tableMain {
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .footer {
    position: fixed;
    bottom: 10px;
    left: 0px;
    right: 0px;
  }
  .tableMain .content .lContent p{
    text-align: left;
    max-width: 110px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .tableMain .content .rContent p{
    max-width: 200px;
    padding-right: 5px;
    text-align: right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
