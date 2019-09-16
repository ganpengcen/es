<template>
<div>
  <p style="height: 35px;line-height: 35px;text-align: left;color: #00AAAA ;font-size: 15px">
    <span style="margin-left: 20px;font-size: 14px" @click="toSecurity"><van-icon name="arrow-left">返回</van-icon></span>
  </p>
        <div class="main" style="font-size: 15px;overflow: auto;">
          <van-cell-group>
  <van-field v-model="itemd.Motif" label="会议主题" disabled
             placeholder="请输入会议主题"></van-field>
   <van-field v-model="itemd.EmployeeS" disabled label="参会人员"
              placeholder="请输入会议人员" ></van-field>
     <van-field label="会议日期" disabled>
      <van-datetime-picker
        v-model="currentDate" v-if="dataFlag"
        type="datetime" slot="input" :item-height="20" :visible-item-count="3" @confirm="confirm"></van-datetime-picker>
      <div slot="input" v-if="!dataFlag" ><span>{{MeetingDate}}</span></div>
    </van-field>
    <van-field v-model="itemd.MeetingMaster" label="主持" disabled
               placeholder="请输入主持" ></van-field>
    <van-field v-model="itemd.Site" label="地点" disabled
               placeholder="请输入地点" ></van-field>
    <van-field v-model="itemd.Content" label="内容" disabled
               placeholder="请输入内容"></van-field>
</van-cell-group>

           <p style="font-size: 12px;text-align: left;color: black;padding-left: 43px;margin-top: 10px">附件:</p>
          <el-upload
            class="upload-demo"
            action="http://acapi.bjjtza.com/api/attachfile/uploadfile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="fileSuccess"
            multiple
            :limit="3"
            :file-list="fileList"
            :on-exceed="handleExceed"
          >
</el-upload>

        <van-cell-group>
             <div v-for="(da, index2) in changetype" :key="index2">
                 <van-field v-model="da.ItemValue" :label="da.Caption" v-if="da.DataType===1" disabled ></van-field>
                 <van-field v-model="da.ItemValue" :label="da.Caption" v-if="da.DataType===2" disabled >
                      <van-datetime-picker
                        v-model="da.DefinedValue"
                        type="datetime" slot="input" :item-height="20" :visible-item-count="3"></van-datetime-picker>
                 </van-field>
                 <van-field v-model="da.ItemValue" :label="da.Caption" v-if="da.DataType===3" disabled >
                 </van-field>
               <van-field v-model="da.ItemValue" :label="da.Caption" v-if="da.DataType===4" disabled >
                 </van-field>
               <van-field  :label="da.Caption" v-if="da.DataType===5">

                 <el-select v-model="da.ItemValue" placeholder="选择" slot="input" multiple  >
                   <el-option v-for="(item,index) in da.DictSelection" :key="index" :label="item.DictName" :value="item.ID" disabled></el-option>
                 </el-select>

                 </van-field>
                <van-field  :label="da.Caption" v-if="da.DataType===6">
                    <el-checkbox slot="input" v-model="da.ItemValue" disabled></el-checkbox>
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
        itemd:[],
        dataFlag:false,
        type:[],
        currentDate: new Date(),
        fileList: [],
        upFileList: [],
        MeetingDate:'',
        changetype:[],
      }
    },
    methods:{
      toSecurity(){
        this.$router.push({
          path:'/Security'
        })
      },
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
            this.changetype = res.data.data;
            this.changeDialog = true
          } else {
            Notify(res.data.msg)
          }
        })
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
      getDetail(ID){
        let param = {
          "DefinedType": 6,
          "BusinessID": ID
        }
        console.log('获取用户自定义项')
        this.$post(api.getitems, param).then(res=>{
          console.log(res)
          if(res.data.state===200){
            this.changetype = res.data.data;
            console.log('this',this.changetype)
          } else {
            Notify(res.data.msg)
          }
        })
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
        this.$get(api.getdm+ID).then(res=>{
          if(res.data.state === 200) {
            this.itemd = res.data.data
            this.detail= true
            console.log('itemd',this.itemd)
            this.MeetingDate = this.itemd.MeetingDate
            this.dataFlag = false
          }
        })
      },
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
    },
    created(){
      this.ID=this.$route.query.ID
      this.getDetail(this.ID)
      this.getmodel(this.ID)
    }
  }
</script>

<style>

</style>
