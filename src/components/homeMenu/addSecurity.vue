<template>
 <div>
   <p style="height: 35px;line-height: 35px;color: #00AAAA">
     <span style="float: left;margin-left: 10px" @click="toSecurity"><van-icon name="arrow-left">返回</van-icon></span>
     <span style="float: right;margin-right: 10px" @click="newdm">提交</span>
   </p>
        <div class="main" style="font-size: 15px;">
          <van-cell-group labelWidth="60px">
  <van-field  v-model="itemd.Motif" label="会议主题"
              required   placeholder="请输入会议主题"></van-field>
   <van-field v-model="itemd.EmployeeS" label="参会人员"
              required     placeholder="请输入参会人员" ></van-field>
    <van-field  label="会议日期">
      <van-datetime-picker
        v-model="currentDate" v-if="dataFlag"
        type="datetime" slot="input" :item-height="20" :visible-item-count="3" @confirm="confirm" ></van-datetime-picker>
      <div slot="input" v-if="!dataFlag" ><span style="margin-left:20px">{{MeetingDate}}</span><i @click="changeflag" class="el-icon-more-outline" style="font-size: 15px;margin-left: 10px"></i></div>
    </van-field>

    <van-field v-model="itemd.MeetingMaster" label="主持" required    placeholder="请输入主持" ></van-field>
    <van-field v-model="itemd.Site" label="地点" required    placeholder="请输入地点" ></van-field>
    <van-field v-model="itemd.Content" label="内容" required    placeholder="请输入内容"></van-field>
</van-cell-group>
           <p style="font-size: 12px;text-align: left;color: black;padding-left: 43px;margin-top: 10px">附件:</p>
          <el-upload
            class="upload-demo"
            :action="api.hostname+'api/attachfile/uploadfile'"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :file-list="fileList"
            multiple
            :limit="3"
            :on-success="fileSuccess"
            :on-exceed="handleExceed"
            :headers="header"
          >
  <el-link size="mini" type="primary" style="margin-top: -40px;margin-left: -110px" :underline="false">点击上传文件</el-link>

</el-upload>
          <van-cell-group>
             <div v-for="(da, index) in type" :key="index">
                 <van-field v-model="da.DefinedValue" :label="da.Caption" v-if="da.DataType===1"  required></van-field>
                 <van-field v-model="da.DefinedValue" :label="da.Caption" v-if="da.DataType===2"  required>
                      <van-datetime-picker
                        v-model="da.DefinedValue"
                        type="datetime" slot="input" :item-height="20" :visible-item-count="3"></van-datetime-picker>
                 </van-field>
                 <van-field v-model="da.DefinedValue" :label="da.Caption" v-if="da.DataType===3"  required>
                 </van-field>
               <van-field v-model="da.DefinedValue" :label="da.Caption" v-if="da.DataType===4"  required>
                 </van-field>
               <van-field :label="da.Caption" required v-if="da.DataType===5">

                 <el-select v-model="da.arr" placeholder="选择" slot="input" multiple>
                   <el-option v-for="(item, index) in da.dic" :key="index" :label="item.DictName" :value="item.ID"></el-option>
                 </el-select>

                 </van-field>
                <van-field :label="da.Caption" v-if="da.DataType===6"  required>
                    <el-checkbox v-model="da.flag"  slot="input"></el-checkbox>
                </van-field>
             </div>
          </van-cell-group>
        </div>
        </div>
</template>

<script type="text/ecmascript-6">
  import api from "../../axios/api";
  import { Notify,Radio  } from 'vant';
export default {
  data(){
    return{
      api:api,
    fileList:[],
      itemd:{},
      changetype:[],
      currentDate: new Date(),
      dataFlag:true,
      upFileList:[],
      arr:[],
      type:[],
      header:{
        "Token":localStorage.token,
        "AccountID":localStorage.AccountID,
      },
    }
  },
  methods:{
    changeflag (){
      this.dataFlag = true
    },
    toSecurity(){
      this.$router.push({
        path:'/Security'
      })
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
        Notify({
          type:'success',
          message:'新建成功',
          background: '#1989fa'
        })
        if(res.data.state === 200){
          this.$router.push({
            path:'/Security'
          })
        } else {
          Notify({
            type:'danger',
            message:res.data.msg
          });
        }
      })
    },  //新建会议
    getmodel(ID) {
        this.parentId = ID
      let param = {
        "DefinedType": 6,
        "BusinessID": ID
      }
      console.log('获取用户自定义项')
      this.$post(api.getitems, param).then(res=>{
        console.log(res)
        if(res.data.state===200){
          this.getdm(ID)
          this.getFile(ID)
          this.changetype = res.data.data;
          this.changeDialog = true
        } else {
          Notify(res.data.msg)
        }
      })
    },  //获取用户自定义详情
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
    addm2() {
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
    },
  },
  created(){
    this.addm2()
  }
}
</script>

<style>

</style>
