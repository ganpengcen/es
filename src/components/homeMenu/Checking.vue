<template>
  <div>
    <div class="box" v-for="item in finishidata" :key="item.BillID">
      <router-link :to="{path:'/MyWork/Checkingdetail',query:{id:item.BillID}}">
        <van-swipe-cell>
          <div class="checking_box1">
            <p>{{item.TaskName}}</p>
            <p>{{item.DangerPointName}}</p>
          </div>
          <div class="checking_box2">
            <p>{{item.EmployeeName}}</p>
            <p>{{item.State}}</p>
            <p>{{item.SubCheckedCount}}/{{item.SubCount}}</p>
          </div>
          <van-button square type="primary" slot="right" text="完成" @click.prevent="finish(item.BillID)" />
          <van-button square type="warning" slot="right" text="查看已完成" />
          <van-button square type="danger" slot="right" text="删除" @click.prevent="delate(item.BillID)" />
        </van-swipe-cell>
      </router-link>
    </div>
  </div>
</template>


<script>
  import api from "../../axios/api";
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        finishidata: [],
        postId: '', //完成的上传id
        delateId: '', //删除的上传id
      };
    },
    created() {
        this.getRenwu();
    },
    methods: {
      //获取任务单据
      getRenwu() {
        this.$get(api.gettaskbills).then(res => {
          console.log(res);
          if (res.data.state == 200) {
            this.finishidata = res.data.data;
            //  console.log(res);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      //完成任务单据
      finish(e) {
        this.postId = e;
        this.$get(api.taskbillover + '/' + this.postId).then(res => {
          if (res.data.state == 200) {
            console.log(res)
            this.getRenwu();
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //删除任务单据
      delate(e) {
        this.delateId = e;
        this.$get(api.deltaskbill + '/' + this.delateId).then(res => {
          if (res.data.state == 200) {
            Toast("删除成功");
            this.getRenwu();
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  };

</script>

<style>
  .checking_box1,
  .checking_box2 {
    display: flex;
    justify-content: space-between;
    padding: 0px 8px;
    box-sizing: border-box;
    text-align: left;
  }

  .checking_box1 p:nth-child(1) {
    flex: 2;
  }

  .checking_box1 p:nth-child(2) {
    flex: 3;
  }

  .checking_box2 {
    border-bottom: 1px solid #ccc;
  }

  .checking_box2 p:nth-child(1) {
    flex: 2;
  }

  .checking_box2 p:nth-child(2) {
    flex: 2;
  }

  .checking_box2 p:nth-child(3) {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }

</style>


<style scoped>

</style>
