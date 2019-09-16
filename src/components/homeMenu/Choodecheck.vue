<template>
  <div>
    <div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-after-expand='false'></el-tree>
    </div>
    <div class="treelist">
      <ul>
        <li v-for="(item,index) in peopleList" :key="index" @click="postmsg(item.OrgName,item.peopleId)">{{item.OrgName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      peopleList:[],    
      
    };
  },
  created() {
    this.gettree();
  },
  methods: {
    postmsg(OrgName,peopleId){
      console.log(peopleId);
      sessionStorage.OrgName = ''
      sessionStorage.peopleId = ''
      sessionStorage.OrgName = OrgName
      sessionStorage.peopleId = peopleId
      this.$router.push({
        name:'Controldetail',
        // query:{
        //   checkname:OrgName,
        //   checkid:peopleId
        // }
      })
    },
    handleNodeClick(data) {
      this.peopleList=[],
      this.treeId = data.ID;
      this.$get(api.getemplist + "/" + this.treeId).then(res => {
        if (res.data.state == 200) {
          if (data.Children) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.peopleList.push({
                OrgName: res.data.data[i].CNName,
                peopleId:res.data.data[i].ID
              })
              // data.Children.push({
              //   OrgName: res.data.data[i].CNName,
              //   peopleId:res.data.data[i].ID
              // });
            }
            console.log(this.peopleList);
          } 
        }
        else {
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
  watch:{
    // 'this.data':{
    //   handler(newdata,olddata){

    //   }
    // },
    // deep:true,
  }
    
  
};
</script>

<style>
.treelist ul li{
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
