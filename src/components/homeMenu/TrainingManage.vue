<template>
  <div class="TrainingManage-wrap">
    <i
      class="el-icon-circle-plus-outline"
      style="font-size: 20px;line-height: 25px;float: right;margin-right: 15px;padding: 5px"
      @click="newForm"
    ></i>
    <div style="clear: both"></div>
    <div class="tableMain">
      <div
        v-for="(item, index) in item"
        :key="index"
        style="border:1px solid gainsboro;margin-top: 5px"
      >
        <van-swipe-cell>
          <div
            class="content"
            style="height: 45px;font-size: 12px;display: flex;justify-content: space-between"
          >
            <div class="lContent">
              <p>培训标题:{{item.Motif}}</p>
              <p>培训日期:{{item.TrainDate}}</p>
            </div>
            <div class="rContent">
              <p>培训时长:{{item.TrainLong}}</p>
              <p>培训人:{{item.Trainer}}</p>
            </div>
          </div>
          <span slot="right">
            <van-button square type="primary" @click="detailContent(item.Content)">详情</van-button>
            <van-button square type="primary" @click="upTrain(item.ID)">修改</van-button>
            <van-button square type="danger" @click="delTrain(item.ID)">删除</van-button>
          </span>
        </van-swipe-cell>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog title="培训详情:" width="100%" :visible.sync="dig3">
      <div v-html="Content"></div>
    </el-dialog>
    <!-- 新建 -->
    <el-dialog
      title="新建培训管理"
      :visible.sync="newDialog"
      width="98%"
      style="overflow: hidden;height: 100%"
    >
      <div class="main" style="font-size: 15px;overflow: auto;padding: 15px;height: 230px">
        <el-form labelWidth="80px" :model="addform">
          <el-form-item label="培训主题:">
            <el-input v-model="addform.Motif" style="width: 220px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="培训时长:">
            <el-input v-model="addform.TrainLong" style="width: 220px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="培训日期:">
            <el-date-picker
              v-model="addform.TrainDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 220px"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="培训人:">
            <el-input v-model="addform.Trainer" style="width: 220px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" :rows="3" v-model="addform.Content"></el-input>
          </el-form-item>
          <!-- <el-form-item label="参培人员:" label-width="100px" > -->
          <p>参培人员:</p>
          <div style="display:flex;justify-content: space-between;">
            <el-cascader
              size="small"
              style="width: 100px"
              :options="orgs"
              v-model="addform.org"
              @change="handleItemChange"
              change-on-select
              placeholder="请选择组织架构"
            ></el-cascader>
            <el-select size="small" v-model="addform.join" style="width: 100px">
              <el-option
                :label="item.CNName"
                :value="item.ID"
                v-for="item of persons"
                :key="item.ID"
              ></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="addItem">增加</el-button>
          </div>
          <!-- </el-form-item> -->
          <el-table :data="joinTable" border style="margin-left: 0;margin-top: 20px" size="mini">
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="部门" align="center" prop="position"></el-table-column>
            <el-table-column label="操作" align="center" prop>
              <template slot-scope="scope">
                <el-button type="text" @click="deleteRow(joinTable, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-upload
            class="upload-demo"
            :action="api.hostname+'api/attachfile/uploadfile'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :headers="headers"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </el-form>
      </div>
      <span>
        <el-button @click="newDialog=false" size="small">取消</el-button>
        <el-button type="primary" @click="add" size="small">确认</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="changeDialog" width="98%" style="overflow: hidden">
      <span>
        <div class="main" style="font-size: 15px;height: 230px;overflow: auto;padding: 15px">
          <el-form labelWidth="80px" :model="upform">
            <el-form-item label="培训主题:">
              <el-input v-model="upform.Motif" style="width: 220px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="培训时长:">
              <el-input v-model="upform.TrainLong" style="width: 220px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="培训日期:">
              <el-date-picker
                v-model="upform.TrainDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 220px"
                size="small"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="培训人:">
              <el-input v-model="upform.Trainer" style="width: 220px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" :rows="3" v-model="upform.Content"></el-input>
            </el-form-item>
            <p>参培人员:</p>
            <div style="display:flex;justify-content: space-between;">
              <el-cascader
                size="small"
                style="width: 100px"
                :options="orgs"
                v-model="upform.org"
                @change="handleItemChange"
                change-on-select
                :props="myprop"
                placeholder="请选择组织架构"
              ></el-cascader>
              <el-select size="small" v-model="upform.join" style="width: 100px">
                <el-option
                  :label="item.CNName"
                  :value="item.ID"
                  v-for="item of persons"
                  :key="item.ID"
                ></el-option>
              </el-select>
              <el-button type="primary" size="small" @click="addItemChange">增加</el-button>
            </div>
            <!-- </el-form-item> -->
            <el-table
              :data="joinTableChange"
              border
              style="margin-left: 0;margin-top: 20px"
              size="mini"
            >
              <el-table-column label="姓名" align="center" prop="name"></el-table-column>
              <el-table-column label="部门" align="center" prop="position"></el-table-column>
              <el-table-column label="操作" align="center" prop>
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteRow(joinTableChange, scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-upload
              class="upload-demo"
              :action="api.hostname + 'api/attachfile/uploadfile'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess1"
              multiple
              :headers="headers"
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="upform.fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form>
        </div>
        <el-button @click="changeDialog=false" size="small">取消</el-button>
        <el-button type="primary" @click="changeTrain" size="small">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../axios/api";

import { Dialog } from "vant";

export default {
  data() {
    return {
      api: api,
      fileList: [],
      detail: false,
      newDialog: false,
      changeDialog: false,
      newData: {
        theme: "",
        time: "",
        person: "",
        date: ""
      },
      //列表显示
      item: [],
      currentPage: 1,
      //详情
      dig3: false,
      Content: "",
      //上传功能
      headers: {
        Token: localStorage.token,
        AccountID: localStorage.AccountID
      },
      fileList: [],
      formInline: {
        keyWords: ""
      },
      //添加
      addform: {},
      //修改
      upform: {},
      TrainID: "",
      //上传的文件
      AttachFiles: [],
      //修改 上传文件
      upAttachFiles: [],
      //组织架构
      orgs: [],
      myprop: {
        label: "OrgName",
        value: "ID",
        children: "Children"
      },
      //人员选择
      persons: [],
      //新增培训
      joinTable: [],
      //修改培训
      joinTableChange: [],

      //分页
      pages: 1,
      PageSize: 50,
      total: 0
    };
  },

  created() {
    this.getdts();
  },
  methods: {
    //获取培训管理列表
    getdts(PageIndex = 1, Motif = "") {
      let params = {
        PageSize: this.PageSize,
        PageIndex: PageIndex - 1,
        KeyWord: "",
        Query: {
          Motif: Motif
        },
        OrderString: "",
        ToExcel: true
      };

      this.$post(api.getdts, params).then(res => {
        if (res.data.state == 200) {
          this.item = res.data.data.Data;
          console.log("getdts", res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //详情
    detailContent(Content) {
      this.dig3 = true;
      this.Content = Content;
    },
    //打开新建
    newForm() {
      this.addform = {};
      this.AttachFiles = []; //清空
      this.fileList = [];
      this.orgs = [];
      this.joinTable = [];

      this.newDialog = true;
      this.getOrgs(this.orgs);
    },

    //新建
    add() {

      if( this.addform.Motif=='' ||  this.addform.Motif==null || this.addform.TrainDate ==''||this.addform.TrainDate ==null || this.addform.TrainLong ==''||this.addform.TrainLong ==null|| this.addform.Trainer ==''||this.addform.Trainer ==null){
        this.$message({
          type:'error',
          message:'信息未填写完整'
        })
        return false;
      }

      var EmployeeIDs = [];

      for (var i = 0; i < this.joinTable.length; i++) {
        EmployeeIDs.push(this.joinTable[i].id);
      }

      let params = {
        Motif: this.addform.Motif,
        TrainDate: this.addform.TrainDate,
        TrainLong: this.addform.TrainLong,
        Trainer: this.addform.Trainer,
        Content: this.addform.Content,
        AttachFiles: this.AttachFiles,
        EmployeeIDs: EmployeeIDs
      };
      console.log("params", params);

      this.$post(api.adddt, params).then(res => {
        if (res.data.state == 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.getdts();
          this.newDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // //动态获取组织选项
    handleItemChange(val) {
      this.getValueKey(this.orgs, val[val.length - 1]);
      //console.log("curr",this.currentOption)
      this.getOrgs(this.currentOption.children, this.currentOption.value);
      // console.log("val", val[val.length - 1])
      this.getPersons(val[val.length - 1]);
    },
    //获取组织选项
    getOrgs(options, id = "00000000-0000-0000-0000-000000000000") {
      //console.log("options", options)
      this.$get(api.getorg + "/" + id).then(res => {
        if (res.data.state == 200) {
          //console.log(res);
          res.data.data.forEach(item => {
            options.push({ label: item.OrgName, value: item.ID, children: [] });
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getValueKey(data, val) {
      // 循环所有键
      for (var key in data) {
        //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
        var element = data[key];
        if (
          (element.length > 0 && typeof element == "object") ||
          typeof element == "object"
        ) {
          this.getValueKey(element, val);
        } else {
          //不是对象或数组、直接输出
          if (element == val) {
            console.log(data);
            data.children = [];
            this.currentOption = data;
          }
        }
      }
    },
    //获取人员列表
    getPersons(id) {
      this.$get(api.getemplist + "/" + id).then(res => {
        if (res.data.state == 200) {
          //console.log(res)
          this.persons = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //增加到表单orgs（添加）
    addItem() {
      var obj = this.persons.find(item => {
        return item.ID == this.addform.join;
      });
      this.joinTable.push({
        name: obj.CNName,
        position: obj.OrgName,
        id: obj.ID
      });
      console.log("this.joinTable", this.joinTable);
    },
    //增加培训人员(修改)
    addItemChange() {
      var obj = this.persons.find(item => {
        return item.ID == this.upform.join;
      });
      //console.log("obj",obj);
      this.joinTableChange.push({
        name: obj.CNName,
        position: obj.OrgName,
        id: obj.ID
      });
      console.log("this.joinTableChange", this.joinTableChange);
    },
    //删除
    deleteRow(table, index) {
      this.$confirm("确定要删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          table.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    //打开修改
    upTrain(ID) {
      this.changeDialog = true;
      this.persons = [];
      this.TrainID = ID;
      this.getModel(ID);
      this.$get(api.gettree + "/00000000-0000-0000-0000-000000000000").then(
        //获取树形接口
        res => {
          if (res.data.state == 200) {
            this.orgs = res.data.data;
            // console.log("org",this.orgs)
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },
    //获取模型
    getModel(ID) {
      this.$get(api.getdt + "/" + ID).then(res => {
        if (res.data.state == 200) {
          this.upform = res.data.data;
          this.getArch(ID);
          this.getdtemps(ID);
          console.log("upform", res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    getdtemps(id = "", pageIndex = 1) {
      this.joinTableChange = [];
      var params = {
        PageSize: this.pageSize,
        PageIndex: pageIndex - 1,
        KeyWord: id,
        Query: {
          TrainID: id
        },
        OrderString: "",
        ToExcel: true
      };
      this.$post(api.getdtemps, params).then(res => {
        if (res.data.state == 200) {
          console.log("res2", res);
          res.data.data.Data.forEach(item => {
            this.joinTableChange.push({
              name: item.Name,
              position: item.Department,
              id: item.EmployeeID
            });
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    //获取电子文档
    getArch(id) {
      this.$set(this.upform, "fileList", []);
      this.$get(api.getfiles + "/" + id).then(res => {
        //console.log("res",res);
        if (res.data.state == 200) {
          res.data.data.forEach(item => {
            this.upform.fileList.push({
              name: item.FileTitle,
              id: item.ID,
              url: item.FileUrl,
              type: item.FileType
            });
          });
          // console.log("fileList", this.formChange.fileList)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    //点击确定修改
    changeTrain() {
      var upEmployeeIDs = [];

      for (var i = 0; i < this.joinTableChange.length; i++) {
        upEmployeeIDs.push(this.joinTableChange[i].id);
      }
      let params = {
        ID: this.TrainID,
        Motif: this.upform.Motif,
        TrainDate: this.upform.TrainDate,
        TrainLong: this.upform.TrainLong,
        Trainer: this.upform.Trainer,
        Content: this.upform.Content,
        AttachFiles: this.upAttachFiles,
        EmployeeIDs: upEmployeeIDs
      };
      console.log("params", params);

      this.$post(api.editdt, params).then(res => {
        if (res.data.state == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.getdts();
          this.changeDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    //上传成功(添加)
    handleSuccess(res, file, filelist) {
      var files = [];
      if (res.state == 200) {
        this.addform.fileList = filelist;
        for (var i = 0; i < filelist.length; i++) {
          files.push({
            FileTitle: filelist[i].raw.name,
            FileUrl: filelist[i].response.data,
            FileType: filelist[i].raw.type
          });
        }
        this.AttachFiles = files;
        console.log("files", files);
      } else {
        this.$message.error(res.data.msg);
      }
      //console.log(res)
    },
    //上传成功(修改)
    handleSuccess1(res, file, filelist) {
      var filess = [];
      if (res.state == 200) {
        this.upform.fileList = filelist;
        for (var i = 0; i < filelist.length; i++) {
          if (filelist[i].raw) {
            filess.push({
              FileTitle: filelist[i].raw.name,
              FileUrl: filelist[i].response.data,
              FileType: filelist[i].raw.type
            });
          } else {
            filess.push({
              FileTitle: filelist[i].name,
              FileUrl: filelist[i].url,
              FileType: filelist[i].type
            });
          }
        }

        this.upAttachFiles = filess;

        //this.AttachFiles = filess;
        console.log("filess", filess);
      } else {
        this.$message.error(res.data.msg);
      }
      //console.log(res)
    },

    //上传功能
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(content) {
      console.log(content);
    },
    handleExceed(content) {
      console.log(content);
    },
    //删除
    delTrain(ID) {
      Dialog.confirm({
        title: "删除",
        message: "确定要删除该条记录吗？"
      })
        .then(() => {
          this.$get(api.deldt + "/" + ID).then(res => {
            if (res.data.state == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getdts();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      //   this.$confirm("确定要删除该条记录吗？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$get(api.deldt + '/' + ID).then( res => {
      //       if (res.data.state == 200) {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功"
      //         });
      //         this.getdts();
      //       } else {
      //         this.$message.error(res.data.msg);
      //       }
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消操作"
      //     });
      //   });
    }
  }
};
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
.tableMain .content {
  padding-left: 5px;
}
.tableMain .content .lContent p {
  text-align: left;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableMain .content .rContent p {
  max-width: 200px;
  padding-right: 5px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer {
  position: fixed;
  bottom: 10px;
  left: 0px;
  right: 0px;
}
.main p {
  padding-left: 5px;
  margin-top: 5px;
  text-align: left;
}
.main p span {
  display: inline-block;
  width: 60px;
}
.main input {
  width: 160px;
  border-radius: 3px;
}
</style>
