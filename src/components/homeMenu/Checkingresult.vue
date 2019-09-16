<template>
  <div>
    <div class="taskresult addtask">
      <ul>
        <li @click="goToStandard">
          <p>查看检查标准</p>
          <p>
            <i class="el-icon-arrow-right"></i>
          </p>
        </li>
        <li @click="Time">
          <p>检查时间</p>
          <p>{{starttime}}</p>
        </li>
        <el-dialog title="检查时间" :visible.sync="dialog1" width="100%">
          <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @cancel="dialog1=false"
            @confirm="Confirm" />
        </el-dialog>
        <li @click="Result">
          <p>检查结果</p>
          <p>{{Caption}}</p>
        </li>
        <el-dialog title="检查结果选择" :visible.sync="dialog2" width="100%">
          <van-picker show-toolbar :columns="Captions" @cancel="dialog2=false" @confirm="confirmChooserisk" />
        </el-dialog>
        <div v-show="list_box">
          <li @click="wh">
            <p>危害因素</p>
            <p>{{whValue}}</p>
          </li>
          <el-dialog title="危害因素选择" :visible.sync="iswh" width="100%">
            <van-picker show-toolbar :columns="whDictName" @cancel="iswh=false" @confirm="whMethod" />
          </el-dialog>
          <li @click="sg">
            <p>事故类型</p>
            <p>{{sgValue}}</p>
          </li>
          <el-dialog title="事故类型选择" :visible.sync="issg" width="100%">
            <van-picker show-toolbar :columns="sgDictName" @cancel="issg=false" @confirm="sgMethod" />
          </el-dialog>
          <li @click="hg">
            <p>事故后果</p>
            <p>{{hgValue}}</p>
          </li>
          <el-dialog title="事故后果选择" :visible.sync="ishg" width="100%">
            <van-picker show-toolbar :columns="hgDictName" @cancel="ishg=false" @confirm="hgMethod" />
          </el-dialog>
          <li @click="yx">
            <p>影响范围</p>
            <p>{{yxValue}}</p>
          </li>
          <el-dialog title="影响范围选择" :visible.sync="isyx" width="100%">
            <van-picker show-toolbar :columns="yxDictName" @cancel="isyx=false" @confirm="yxMethod" />
          </el-dialog>
          <li @click="pc">
            <p>评测方法</p>
            <p>{{mCaption}}</p>
          </li>
          <el-dialog title="评测方法选择" :visible.sync="dialog3" width="100%">
            <van-picker show-toolbar :columns="MethodCaption" @cancel="dialog3=false" @confirm="pcMethod" />
          </el-dialog>
          <div class="LECD" v-show="iSLECD">
            <li @click="LECD_Ls">
              <p>LECD_L</p>
              <p>{{LECD_LValue}}</p>
            </li>
            <el-dialog title="LECD_L选择" :visible.sync="isLECD_L" width="100%">
              <van-picker show-toolbar :columns="LECD_LDictName" @cancel="isLECD_L=false" @confirm="mLECD_L" />
            </el-dialog>
            <li @click="LECD_Es">
              <p>LECD_E</p>
              <p>{{LECD_EValue}}</p>
            </li>
            <el-dialog title="LECD_E选择" :visible.sync="isLECD_E" width="100%">
              <van-picker show-toolbar :columns="LECD_EDictName" @cancel="isLECD_E=false" @confirm="mLECD_E" />
            </el-dialog>
            <li @click="LECD_Cs">
              <p>LECD_C</p>
              <p>{{LECD_CValue}}</p>
            </li>
            <el-dialog title="LECD_C选择" :visible.sync="isLECD_C" width="100%">
              <van-picker show-toolbar :columns="LECD_CDictName" @cancel="isLECD_C=false" @confirm="mLECD_C" />
            </el-dialog>
          </div>
          <div class="LSD" v-show="iSLSD">
            <li @click="LSD_Ls">
              <p>LSD_L</p>
              <p>{{LSD_LValue}}</p>
            </li>
            <el-dialog title="LSD_L选择" :visible.sync="isLSD_L" width="100%">
              <van-picker show-toolbar :columns="LSD_LDictName" @cancel="isLSD_L=false" @confirm="mLSD_L" />
            </el-dialog>
            <li @click="LSD_Ss">
              <p>LSD_S</p>
              <p>{{LSD_SValue}}</p>
            </li>
            <el-dialog title="LSD_S选择" :visible.sync="isLSD_S" width="100%">
              <van-picker show-toolbar :columns="LSD_SDictName" @cancel="isLSD_S=false" @confirm="mLSD_S" />
            </el-dialog>
          </div>
          <li @click="fx">
            <p>风险等级</p>
            <p>{{fxValue}}</p>
          </li>
          <el-dialog title="风险等级选择" :visible.sync="isfx" width="100%">
            <van-picker show-toolbar :columns="fxDictName" @cancel="isfx=false" @confirm="fxMethod" />
          </el-dialog>
          <li @click="yh">
            <p>隐患等级</p>
            <p>{{yhValue}}</p>
          </li>
          <el-dialog title="隐患等级选择" :visible.sync="isyh" width="100%">
            <van-picker show-toolbar :columns="yhDictName" @cancel="isyh=false" @confirm="yhMethod" />
          </el-dialog>
          <li @click="fzr">
            <p>负责人</p>
            <p>{{OrgName}}</p>
          </li>
          <el-dialog title="负责人选择" :visible.sync="isfzr" width="100%">
            <div>
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-after-expand="false">
              </el-tree>
            </div>
            <div class="treelist">
              <ul>
                <li v-for="(item,index) in peopleList" :key="index" @click="postmsg(item.OrgName,item.peopleId)">
                  {{item.OrgName}}</li>
              </ul>
            </div>
          </el-dialog>

        </div>
      </ul>
      <div class="discripe">
        <p>描述</p>
        <textarea cols="45" rows="4" v-model="MiaoShu" style="width:90%"></textarea>
      </div>
      <div class="photo">
        <p>
          <span type="primary" class="wrapper">
            <label class="btn" for="fileUpload">拍照&视频</label>
          </span>

           <span class="camera" @click="selectFile">
            <i class="el-icon-camera-solid"></i>
          </span>
          <!--调取相机-->
          <input type="file" style="display:none;" id="a" accept="image/*" multiple="multiple"
            @change="uploadImg($event)" />

        </p>
        <div class="imgs_box">
          <div class="imgs_list_box" v-for="(item,index) in imgss" :key="index">
            <div class="imgs_img_box">
              <img :src="api.hostname + item.FileUrl.slice(2)" class="avatar" v-preview="api.hostname + item.FileUrl.slice(2)">
            </div>
            <!-- <div class="imgs_img_box" @click="playVideo" v-else>
              <video class="video" id="myVideo" :src=" api.hostname + item.FileUrl.slice(2)"></video>
            </div> -->

            <el-input v-model="imgTitles[index]" @blur="shiqu" style="width:48vw" placeholder="请输入标题"></el-input>
            <div>
               <!-- <template slot-scope="scope"> -->
                   <div class="icon_boxs" @click="del(index)">
                        <i class="el-icon-delete"></i>
                   </div>
               <!-- </template> -->
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="addtemptask">提交</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from "../../axios/api";
  import axios from 'axios'
  export default {
    data() {
      return {
        api: api,
        resultId: "",
        arrs: {},
        BillID: '', //单据ID,
        SubType: '', //主体类型
        SubjectID: '', //主体ID,
        DangerID: '', //风控项ID
        //检查时间
        dialog1: false,
        currentDate: new Date(),
        minDate: new Date(),
        starttime: '请选择',
        postDate: "", //时间
        //任务检查结果
        taskresult: [],
        dialog2: false,
        Caption: '请选择', //选中的值
        Captions: [], //任务结果
        id: [], //任务结果id,
        jieguoid: '',
        //描述
        MiaoShu: '',

        //拍照
        Header: [], //图片路径
        fileList: [],
        headers: {
          Token: localStorage.token,
          AccountID: localStorage.AccountID
        },
        imageUrl: "",
        //展示图片集合
        imgs_list: [],
        //标题
        imgTitles: [],
        imgss: [],

        //危害因素
        iswh: false,
        whs: [], //危害,
        whDictName: [], //危害因素的值
        whIDs: [], //危害因素的ID
        whValue: '请选择危害因素', //选中的值
        whId: '', //选中的ID

        //事故类型
        issg: false,
        sgs: [], //事故类型,
        sgDictName: [], //事故类型的值
        sgIDs: [], //事故类型的ID
        sgValue: '请选择事故类型', //选中的值
        sgId: '', //选中的ID

        //事故后果
        ishg: false,
        hgs: [], //事故后果,
        hgDictName: [], //事故后果的值
        hgIDs: [], //事故后果的ID
        hgValue: '请选择事故后果', //选中的值
        hgId: '', //选中的ID

        //影响范围
        isyx: false,
        yxs: [], //影响范围,
        yxDictName: [], //影响范围的值
        yxIDs: [], //影响范围的ID
        yxValue: '请选择影响范围', //选中的值
        yxId: '', //选中的ID

        //风险等级
        isfx: false,
        fxs: [], //风险等级,
        fxDictName: [], //风险等级的值
        fxIDs: [], //风险等级的ID
        fxLECD_DMaxValue: [], //风险等级的最大值LECD_DMaxValue
        fxLECD_DMinValue: [], //风险等级的最小值LECD_DMinValue
        fxValue: '请选择风险等级', //选中的值
        fxId: '', //选中的ID,
        fxLECD_DMax: '', //选中的LECD_DMaxValue
        fxLECD_DMin: '', //选中的LECD_DMinValue


        //隐患等级
        isyh: false,
        yhs: [], //隐患等级,
        yhDictName: [], //隐患等级的值
        yhIDs: [], //隐患等级的ID
        yhValue: '请选择隐患等级', //选中的值
        yhId: '', //选中的ID

        //负责人
        isfzr: false,
        OrgName: '', //选中的值
        PrincipalID: '', //选中的id
        data: [],
        defaultProps: {
          children: "Children",
          label: "OrgName"
        },
        treeId: "",
        peopleList: [],
        dialogVisible1: false, //模态框状态



        //选择异常时
        list_box: false,

        //选择评测方法时
        iSLECD: false,
        iSLSD: false,
        dialog3: false,
        method: [], //评测方法,
        MethodCaption: [], //评测方法的值
        MethodValue: [], //评测方法的ID
        mCaption: '请选择评测方法', //选中的值
        mId: '', //选中的ID

        //------LECD_L法------
        isLECD_L: false,
        LECD_L: [], //LECD_L法
        LECD_LDictName: [], //LECD_L法的DictName
        LECD_LIDs: [], //LECD_L法的ID
        LECD_LMaxValue: [], //LECD_L法的MaxValue
        LECD_LValue: '', //LECD_L法选中的值
        LECD_LId: '', //LECD_L法选中的ID
        LECD_LMax: '', //LECD_L法选中的MaxValue

        //------LECD_E法------
        isLECD_E: false,
        LECD_E: [], //LECD_E法
        LECD_EDictName: [], //LECD_E法的DictName
        LECD_EIDs: [], //LECD_E法的ID
        LECD_EMaxValue: [], //LECD_E法的MaxValue
        LECD_EValue: '', //LECD_E法选中的值
        LECD_EId: '', //LECD_E法选中的ID
        LECD_EMax: '', //LECD_E法选中的MaxValue

        //------LECD_C法------
        isLECD_C: false,
        LECD_C: [], //LECD_C法
        LECD_CDictName: [], //LECD_C法的DictName
        LECD_CIDs: [], //LECD_C法的ID
        LECD_CMaxValue: [], //LECD_C法的MaxValue
        LECD_CValue: '', //LECD_C法选中的值
        LECD_CId: '', //LECD_C法选中的ID
        LECD_CMax: '', //LECD_C法选中的MaxValue

        //------LSD_L法------
        isLSD_L: false,
        LSD_L: [], //LSD_L法
        LSD_LDictName: [], //LSD_L法的DictName
        LSD_LIDs: [], //LSD_L法的ID
        LSD_LMaxValue: [], //LSD_L法的MaxValue
        LSD_LValue: '', //LSD_L法选中的值
        LSD_LId: '', //LSD_L法选中的ID
        LSD_LMax: '', //LSD_L法选中的MaxValue

        //------LSD_S法------
        isLSD_S: false,
        LSD_S: [], //LSD_S法
        LSD_SDictName: [], //LSD_S法的DictName
        LSD_SIDs: [], //LSD_S法的ID
        LSD_SMaxValue: [], //LSD_S法的MaxValue
        LSD_SValue: '', //LSD_S法选中的值
        LSD_SId: '', //LSD_S法选中的ID
        LSD_SMax: '', //LSD_S法选中的MaxValue

        //计算得出的等级
        jisuanDengji: 0,


      };
    },
    created() {
      this.resultId = this.$route.query.resultId;
      this.BillID = this.$route.query.BillID;
      this.SubType = this.$route.query.SubjectType;
      this.SubjectID = this.$route.query.SubjectID;
      this.DangerID = this.$route.query.DangerID;

      console.log(this.resultId, this.BillID)
      this.taskresulttype();
      this.getdangerdict();


      this.gettree();

      //this.getEval_LECD_L();
    },
    methods: {
      //----------------------查看检查标准-----------------------------
      goToStandard() {
        this.$router.push({
          name: 'Standard',
          query: {
            BillID: this.BillID
          }
        })
      },

      //-------------------------------选择时间------------------------------
      //点击选择时间
      Time() {
        this.dialog1 = true;
      },
      //确定时间按钮
      Confirm() {
        this.starttime = this.currentDate.toLocaleDateString();
        this.dialog1 = false;
        this.formatDateTime(this.currentDate);
        console.log("this.postDate", this.postDate);
      },
      //时间转换
      formatDateTime(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var s = date.getSeconds();
        this.postDate = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
      },
      //------------------------------选择时间------------------------------


      //------------------------------任务检查结果------------------------------
      //点击任务检查结果
      Result() {
        this.dialog2 = true;
      },
      //获取任务检查结果
      taskresulttype() {
        this.$get(api.taskresulttype).then(res => {
          if (res.data.state == 200) {
            this.taskresult = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.Captions.push(res.data.data[i].Caption);
              this.id.push(res.data.data[i].Value);
            }
            console.log("taskresulttype", this.taskresult)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定任务检查结果选择
      confirmChooserisk(value, index) {
        console.log("value, index", value, index);
        this.Caption = `${value}`;
        this.jieguoid = this.id[`${index}`];
        this.dialog2 = false;
        //判断是否选择的是 异常
        if (this.jieguoid == 2) {
          this.list_box = true;
        } else {
          this.list_box = false;
        }
        //
        console.log("id", this.jieguoid);
      },
      //------------------------------任务检查结果------------------------------

      //   getsubresult() {
      //     this.$get(api.getsubresult + "/" + this.resultId).then(res => {
      //       console.log(res.data.data)
      //       if (res.data.state == 200) {
      //         this.arrs = res.data.data;
      //         console.log(res.data.data)
      //         //   for (var i = 0; i < this.arrs.length; i++) {
      //         switch (this.arrs.TaskResult) {
      //           case 1:
      //             this.arrs.TaskResult = "正常";
      //             break;
      //           case 2:
      //             this.aarrs.TaskResult = "异常";
      //             break;
      //           case 3:
      //             this.arrs.TaskResult = "管控中";
      //             break;
      //           case 4:
      //             this.arrs.TaskResult = "处理后异常";
      //             break;
      //         }
      //         //   }
      //       } else {
      //         this.$message.error(res.data.msg);
      //       }
      //     });
      //   },

      //------------------------------拍照------------------------------
      selectFile() {
        document.getElementById('a').click();
      },

      //上传文件
      uploadImg(e) {

        //var files = e.target.files[0]; //获取上传的文件信息


        var files = document.getElementById("a").files[0];

        var formData = new FormData();
        formData.append("content", files);
        //console.log("222", formData.get("content"))
        console.log("filess",files);
        //formData.append(" "," ")
        //console.log("re222s", localStorage.Type)
        // boundary=;s


        let token = localStorage.getItem('token');
        let accId = localStorage.getItem('AccountID')
          let instance = axios.create({
          headers: {
          'AccountID': accId,
            'token': token
        }
      })

        var imgs = {};
        console.log('formData',formData)
        instance.post( api.hostname +'/api/attachfile/uploadfile', formData).then((res) => {
            console.log(res)
            this.Header.push(res.data.data); //图片路径

            //for (var i = 0; i < fileList.length; i++) {
              imgs.FileType = files.type;
              imgs.FileUrl = res.data.data;
            //}

            this.imgss.push(imgs);

            console.log("img", this.imgss);

        })

      // this.$post(api.hostname + 'api/attachfile/uploadfile', formData).then(res => {
      //   if (res.data.state == 200) {

      //     console.log("res", res)
      //     localStorage.Type = 'application/json';
      //   } else {
      //     this.$message.error(res.data.msg)
      //   }
      // })



    },
      //上传成功
      handleAvatarSuccess(res, file, fileList) {
        //this.imgss = [];
        var imgs = {};
        if (res.state == 200) {
          this.imgs_list.push(api.hostname + res.data.slice(2)); //图片路径
          this.Header.push(res.data); //图片路径

          for (var i = 0; i < fileList.length; i++) {
            (imgs.FileType = fileList[i].raw.type), (imgs.FileUrl = res.data);
          }

          this.imgss.push(imgs);

          console.log("img", fileList);
        } else {
          this.$message.error(res.data.msg);
        }
      },
      //失去焦点时赋值
      shiqu() {
        let imgTitle = this.imgTitle;
        if (imgTitle) {
          this.imgTitles.push(imgTitle);
        }
        console.log("this.imgTitles", this.imgTitles);
      },
      beforeAvatarUpload() {},

      //删除图片
      del(index) {
        this.imgs_list.splice(index, 1);
        this.imgss.splice(index,1);
      },
      //------------------------------拍照------------------------------





      //负责人
      fzr() {

      },
      //-----------------------------评测方法-----------------------------
      //点击评测方法
      pc() {
        this.MethodCaption = []; //先清空
        this.MethodValue = [];

        this.evaluatemethod(); //调用评测方法
        this.dialog3 = true;
      },

      //获取评测方法
      evaluatemethod() {
        this.$get(api.evaluatemethod).then(res => {
          if (res.data.state == 200) {
            this.method = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.MethodCaption.push(res.data.data[i].Caption);
              this.MethodValue.push(res.data.data[i].Value);
            }
            console.log("method", this.method)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击确定评测方法
      pcMethod(value, index) {
        this.mCaption = `${value}`;
        this.mId = this.MethodValue[`${index}`];
        console.log(" this.mId", this.mId)
        this.dialog3 = false;
        if (this.mId == 2) {
          this.iSLECD = true;
          this.iSLSD = false;
        } else if (this.mId == 3) {
          this.iSLSD = true;
          this.iSLECD = false;
        } else {
          this.iSLECD = false;
          this.iSLSD = false;
        }
      },

      //-----LECD_L法-----
      //获取LECD_L词典
      getEval_LECD_L() {
        this.$get(api.getEval_LECD_L).then(res => {
          if (res.data.state == 200) {
            this.LECD_L = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.LECD_LDictName.push(res.data.data[i].DictName);
              this.LECD_LIDs.push(res.data.data[i].ID);
              this.LECD_LMaxValue.push(res.data.data[i].MaxValue)
            }
            console.log("LECD_L", this.LECD_L)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击LECD_L
      LECD_Ls() {
        this.LECD_LDictName = [];
        this.LECD_LIDs = [];
        this.getEval_LECD_L();
        this.isLECD_L = true;
      },
      //点击确定LECD_L
      mLECD_L(value, index) {
        this.LECD_LValue = `${value}`;
        this.LECD_LId = this.LECD_LIDs[`${index}`];
        this.LECD_LMax = this.LECD_LMaxValue[`${index}`];
        this.isLECD_L = false;
        console.log("this.LECD_LId,this.LECD_LMax", this.LECD_LId, this.LECD_LMax)
      },
      //-----LECD_L法-----

      //-----LECD_E法-----
      //获取LECD_E词典
      getEval_LECD_E() {
        this.$get(api.getEval_LECD_E).then(res => {
          if (res.data.state == 200) {
            this.LECD_E = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.LECD_EDictName.push(res.data.data[i].DictName);
              this.LECD_EIDs.push(res.data.data[i].ID);
              this.LECD_EMaxValue.push(res.data.data[i].MaxValue)
            }
            console.log("LECD_E", this.LECD_E)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击LECD_E
      LECD_Es() {
        this.LECD_EDictName = [];
        this.LECD_EIDs = [];
        this.getEval_LECD_E();
        this.isLECD_E = true;
      },
      //点击确定LECD_E
      mLECD_E(value, index) {
        this.LECD_EValue = `${value}`;
        this.LECD_EId = this.LECD_EIDs[`${index}`];
        this.LECD_EMax = this.LECD_EMaxValue[`${index}`];
        this.isLECD_E = false;
        console.log("this.LECD_EValue,this.LECD_EMax", this.LECD_EId, this.LECD_EMax)
      },
      //-----LECD_E法-----

      //-----LECD_C法-----
      //获取LECD_C词典
      getEval_LECD_C() {
        this.$get(api.getEval_LECD_C).then(res => {
          if (res.data.state == 200) {
            this.LECD_C = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.LECD_CDictName.push(res.data.data[i].DictName);
              this.LECD_CIDs.push(res.data.data[i].ID);
              this.LECD_CMaxValue.push(res.data.data[i].MaxValue)
            }
            console.log("LECD_C", this.LECD_C)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击LECD_C
      LECD_Cs() {
        this.LECD_CDictName = [];
        this.LECD_CIDs = [];
        this.getEval_LECD_C();
        this.isLECD_C = true;
      },
      //点击确定LECD_C
      mLECD_C(value, index) {
        this.LECD_CValue = `${value}`;
        this.LECD_CId = this.LECD_CIDs[`${index}`];
        this.LECD_CMax = this.LECD_CMaxValue[`${index}`];
        this.isLECD_C = false;
        console.log("this.LECD_CValue,this.LECD_CMax", this.LECD_CId, this.LECD_CMax)

        var dengji = this.LECD_LMax * this.LECD_EMax * this.LECD_CMax;
        console.log('风险等级：', this.LECD_LMax * this.LECD_EMax * this.LECD_CMax)

        this.jisuanDengji = dengji;
        for (let i = 0; i < this.fxs.length; i++) {
          if (dengji <= this.fxs[i].LECD_DMaxValue && dengji >= this.fxs[i].LECD_DMinValue) {
            this.fxValue = this.fxs[i].DictName;
            this.fxId = this.fxs[i].ID;
            console.log("this.fxs[i].LECD_DMaxValue", this.fxs[i].LECD_DMaxValue, this.fxs[i].LECD_DMinValue)
          }

        }

      },
      //-----LECD_C法-----

      //-----LSD_L法-----
      //获取LSD_L词典
      getEval_LSD_L() {
        this.$get(api.getEval_LSD_L).then(res => {
          if (res.data.state == 200) {
            this.LSD_L = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.LSD_LDictName.push(res.data.data[i].DictName);
              this.LSD_LIDs.push(res.data.data[i].ID);
              this.LSD_LMaxValue.push(res.data.data[i].MaxValue)
            }
            console.log("LSD_L", this.LSD_L)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击LSD_L
      LSD_Ls() {
        this.LSD_LDictName = [];
        this.LSD_LIDs = [];
        this.getEval_LSD_L();
        this.isLSD_L = true;
      },
      //点击确定LSD_L
      mLSD_L(value, index) {
        this.LSD_LValue = `${value}`;
        this.LSD_LId = this.LSD_LIDs[`${index}`];
        this.LSD_LMax = this.LSD_LMaxValue[`${index}`];
        this.isLSD_L = false;
        console.log("this.LSD_LValue,this.LSD_LMax", this.LSD_LId, this.LSD_LMax)
      },
      //-----LSD_L法-----

      //-----LSD_S法-----
      //获取LSD_S词典
      getEval_LSD_S() {
        this.$get(api.getEval_LSD_S).then(res => {
          if (res.data.state == 200) {
            this.LSD_S = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.LSD_SDictName.push(res.data.data[i].DictName);
              this.LSD_SIDs.push(res.data.data[i].ID);
              this.LSD_SMaxValue.push(res.data.data[i].MaxValue)
            }
            console.log("LSD_S", this.LSD_S)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //点击LSD_S
      LSD_Ss() {
        this.LSD_SDictName = [];
        this.LSD_SIDs = [];
        this.getEval_LSD_S();
        this.isLSD_S = true;
      },
      //点击确定LSD_S
      mLSD_S(value, index) {
        this.LSD_SValue = `${value}`;
        this.LSD_SId = this.LSD_SIDs[`${index}`];
        this.LSD_SMax = this.LSD_SMaxValue[`${index}`];
        this.isLSD_S = false;

        console.log("this.LSD_SValue,this.LSD_SMax", this.LSD_SId, this.LSD_SMax)
        var dengjier = this.LSD_LMax * this.LSD_SMax;
        this.jisuanDengji = dengjier;
        console.log('风险等级：', this.LSD_LMax * this.LSD_SMax)

        for (let i = 0; i < this.fxs.length; i++) {
          if (dengjier <= this.fxs[i].LSD_DMaxValue && dengjier >= this.fxs[i].LSD_DMinValue) {
            this.fxValue = this.fxs[i].DictName;
            this.fxId = this.fxs[i].ID;
            console.log("this.fxs[i].LECD_DMaxValue", this.fxs[i].LSD_DMaxValue, this.fxs[i].LSD_DMinValue)
          }

        }
      },
      //-----LSD_S法-----

      //----------------------------评测方法-----------------------------


      //----------------------------危害因素-----------------------------
      //点击危害因素
      wh() {
        this.whDictName = [];
        this.whIDs = [];
        this.getevealwhys();
        this.iswh = true;
      },
      //获取危害因素
      getevealwhys() {
        this.$get(api.getevealwhys).then(res => {
          if (res.data.state == 200) {
            this.whs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.whDictName.push(res.data.data[i].DictName);
              this.whIDs.push(res.data.data[i].ID);
            }
            console.log("whs", this.whs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定危害因素选择
      whMethod(value, index) {
        console.log("value, index", value, index);
        this.whValue = `${value}`;
        this.whId = this.whIDs[`${index}`];
        this.iswh = false;

        console.log("this.whId", this.whId);
      },
      //----------------------------危害因素-----------------------------

      //----------------------------事故类型-----------------------------
      //点击事故类型
      sg() {
        this.sgDictName = [];
        this.sgIDs = [];
        this.getevealsglx();
        this.issg = true;
      },
      //获取事故类型
      getevealsglx() {
        this.$get(api.getevealsglx).then(res => {
          if (res.data.state == 200) {
            this.sgs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.sgDictName.push(res.data.data[i].DictName);
              this.sgIDs.push(res.data.data[i].ID);
            }
            console.log("sgs", this.sgs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定事故类型选择
      sgMethod(value, index) {
        console.log("value, index", value, index);
        this.sgValue = `${value}`;
        this.sgId = this.sgIDs[`${index}`];
        this.issg = false;

        console.log("this.sgId", this.sgId);
      },
      //----------------------------事故类型-----------------------------

      //----------------------------事故后果-----------------------------
      //点击事故后果
      hg() {
        this.hgDictName = [];
        this.hgIDs = [];
        this.getevealsyhg();
        this.ishg = true;
      },
      //获取事故后果
      getevealsyhg() {
        this.$get(api.getevealsyhg).then(res => {
          if (res.data.state == 200) {
            this.hgs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.hgDictName.push(res.data.data[i].DictName);
              this.hgIDs.push(res.data.data[i].ID);
            }
            console.log("hgs", this.hgs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定事故后果选择
      hgMethod(value, index) {
        console.log("value, index", value, index);
        this.hgValue = `${value}`;
        this.hgId = this.hgIDs[`${index}`];
        this.ishg = false;

        console.log("this.hgId", this.hgId);
      },
      //----------------------------事故后果-----------------------------

      //----------------------------影响范围-----------------------------
      //点击影响范围
      yx() {
        this.yxDictName = [];
        this.yxIDs = [];
        this.getevealyxfw();
        this.isyx = true;
      },
      //获取影响范围
      getevealyxfw() {
        this.$get(api.getevealyxfw).then(res => {
          if (res.data.state == 200) {
            this.yxs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.yxDictName.push(res.data.data[i].DictName);
              this.yxIDs.push(res.data.data[i].ID);
            }
            console.log("yxs", this.yxs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定影响范围选择
      yxMethod(value, index) {
        console.log("value, index", value, index);
        this.yxValue = `${value}`;
        this.yxId = this.yxIDs[`${index}`];
        this.isyx = false;

        console.log("this.yxId", this.yxId);
      },
      //----------------------------影响范围-----------------------------


      //----------------------------风险等级-----------------------------
      //点击风险等级
      fx() {
        this.fxDictName = [];
        this.fxIDs = [];
        this.getdangerdict();
        this.isfx = true;
      },
      //获取风险等级
      getdangerdict() {
        this.$get(api.getdangerdict).then(res => {
          if (res.data.state == 200) {
            this.fxs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.fxDictName.push(res.data.data[i].DictName);
              this.fxIDs.push(res.data.data[i].ID);
              this.fxLECD_DMaxValue.push(res.data.data[i].LECD_DMaxValue);
              this.fxLECD_DMinValue.push(res.data.data[i].LECD_DMinValue)
            }
            console.log("fxs", this.fxs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定风险等级选择
      fxMethod(value, index) {
        console.log("value, index", value, index);
        this.fxValue = `${value}`;
        this.fxId = this.fxIDs[`${index}`];
        this.fxLECD_DMax = this.fxLECD_DMaxValue[`${index}`];
        this.fxLECD_DMin = this.fxLECD_DMinValue[`${index}`];
        this.isfx = false;

        console.log("this.fxId", this.fxId, this.fxLECD_DMax, this.fxLECD_DMin);
      },
      //----------------------------风险等级-----------------------------


      //----------------------------隐患等级-----------------------------
      //点击隐患等级
      yh() {
        this.yhDictName = [];
        this.yhIDs = [];
        this.getTroubleLevel();
        this.isyh = true;
      },
      //获取隐患等级
      getTroubleLevel() {
        this.$get(api.getTroubleLevel).then(res => {
          if (res.data.state == 200) {
            this.yhs = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.yhDictName.push(res.data.data[i].DictName);
              this.yhIDs.push(res.data.data[i].ID);
            }
            console.log("yhs", this.yhs)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //确定隐患等级选择
      yhMethod(value, index) {
        console.log("value, index", value, index);
        this.yhValue = `${value}`;
        this.yhId = this.yhIDs[`${index}`];
        this.isyh = false;

        console.log("this.yhId", this.yhId);
      },
      //----------------------------隐患等级-----------------------------


      //----------------------------负责人-----------------------------
      //点击负责人
      fzr() {

        this.isfzr = true;
      },


      handleNodeClick(data) {

        (this.peopleList = []), (this.treeId = data.ID);
        this.$get(api.getemplist + "/" + this.treeId).then(res => {
          if (res.data.state == 200) {
            if (data.Children) {
              for (var i = 0; i < res.data.data.length; i++) {
                this.peopleList.push({
                  OrgName: res.data.data[i].CNName,
                  peopleId: res.data.data[i].ID
                });
              }
              console.log(this.peopleList);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //获取组织架构的树形结构
      gettree() {
        this.$get(
          api.gettree + "/" + "00000000-0000-0000-0000-000000000000"
        ).then(res => {
          if (res.data.state == 200) {
            this.data = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      postmsg(OrgName, peopleId) {
        console.log("peopleId", peopleId)
        this.dialogVisible1 = true;
        this.OrgName = OrgName;
        this.PrincipalID = peopleId;

        this.isfzr = false;

      },


      //----------------------------负责人-----------------------------


      //提交
      addtemptask() {
        for (var i = 0; i < this.imgss.length; i++) {
          this.imgss[i].FileTitle = this.imgTitles[i];
        }

        let params = {
          "BillID": this.BillID,
          "SubjectType": this.SubType,
          "SubjectID": this.SubjectID,
          "TaskResult": this.jieguoid,
          "TaskResultMemo": this.MiaoShu,
          "DangerID": this.DangerID,
          "AttachFiles": this.imgss,
          "Eval_WHYS": this.whId,
          "Eval_SGLX": this.sgId,
          "Eval_SGJG": this.hgId,
          "Eval_YXFW": this.yxId,
          "Eval_Method": this.mId,
          "TroubleLevel": this.yhId,
          "DangerLevel": this.fxId,
          "PrincipalID": this.PrincipalID,
          "LECD_L": this.LECD_LId,
          "LECD_E": this.LECD_EId,
          "LECD_C": this.LECD_CId,
          "LSD_L": this.LSD_LId,
          "LSD_S": this.LSD_SId,
          "DValue": this.jisuanDengji
        }
        console.log("params", params)

        this.$post(api.addtasksubject, params).then(res => {
          if (res.data.state == 200) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
            // this.$router.go(0); //刷新当前页
            this.$router.push('/MyWork/Checkingdetail?id='+ this.BillID)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //播放视频
      playVideo() {
        var vdo = document.getElementById("myVideo");

        if(vdo.style.width=='100%'){
             vdo.setAttribute('style','width: 30vw;height: 25vw;')
             vdo.pause(); //暂停
        }else{
             vdo.setAttribute('style','position: absolute;top:0;bottom: 0;left: 0;right: 0;width:100%;height:100%;z-index:99;background: #000;')
             vdo.play();//播放
        }
      },
    }
  };

</script>

<style>
  .taskresult ul li {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    line-height: 44px;
  }

  .taskresult ul li p {
    font-size: 14px;
    line-height: 36px;
  }

  .discripe p {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 40px;
  }

  .discripe textarea {
    color: #666;
    border-radius: 5px;
  }

  .camera {
    font-size: 8vw;
    color: #409eff;
  }


  .photo p {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 14px;
    font-size: 14px;
    line-height: 36px;
  }

  .photo p .van-icon-photograph:before {
    font-size: 18px;
  }

  .imgs_box {
    padding: 5vw 5vw;
  }

  .imgs_list_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:15px 0;
  }

  .imgs_img_box {
    width: 25vw;
    height: 25vw;
  }

  .imgs_img_box img {
    width: 100%;
    height: 100%;
  }

  .addtask .van-picker-column ul li {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .icon_boxs{
      font-size:5vw;
  }
  .video {
    width: 30vw;
    height: 25vw;

  }

</style>
