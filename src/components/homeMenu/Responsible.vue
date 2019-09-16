<template>
  <div>
    <div>
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :render-after-expand="false"
      ></el-tree>
    </div>
    <div class="treelist">
      <ul>
        <li
          v-for="(item,index) in peopleList"
          :key="index"
          @click="postmsg(item.OrgName,item.peopleId)"
        >{{item.OrgName}}</li>
      </ul>
    </div>

    <!-- 模态框 -->
    <div class="yanshou">
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="80%">
        <span>确定将负责人转让给他吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="pigeonhole">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import api from "../../axios/api";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "Children",
        label: "OrgName"
      },
      treeId: "",
      peopleList: [],
      dialogVisible1: false, //模态框状态
      CtrID: "", //需要上传的管控id
      PrincipalID: "" //需要上传的转让人id
    };
  },
  created() {
    this.CtrID = this.$route.query.ID;
    //   console.log(this.$route.query.ID)
    this.gettree();
    // this.transferPrincipal();//转让责任人
  },
  methods: {
    pigeonhole() {
      let params = {
        CtrID: this.CtrID,
        PrincipalID: this.PrincipalID
      };
      this.$post(api.transferPrincipal, params).then(res => {
        if (res.data.state == 200) {
          Toast("转让成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible1 = false;
       this.$router.push({
          name: "HiddenTrouble"
        });
    },
    postmsg(OrgName, peopleId) {
      //   console.log(peopleId)
      this.dialogVisible1 = true;
      this.PrincipalID = peopleId;

      //   console.log(OrgName)
      //返回管控页面
      //     this.$router.push({
      //     name: "HiddenTrouble"
      //   });
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
            // console.log(this.peopleList);
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
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          //   // console.log(this.data);
          // }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
    //根据组织ID获取人员模型列表
  },
  watch: {
    // 'this.data':{
    //   handler(newdata,olddata){
    //   }
    // },
    // deep:true,
  }
};
</script>

<style>
.treelist ul li {
  text-align: left;
  padding-left: 16px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ccc;
  line-height: 30px;
}
</style>


<style scoped>
</style>
