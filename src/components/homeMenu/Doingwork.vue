<template>
  <div class="box">
    <ul>
      <li v-for="item in finishidata" :key="item.OpreateBillID">
        <router-link :to="{path:'/MyWork/Workdetail',query:{id:item.OpreateBillID,AllCount:item.AllCount}}">       
          <div class="bbooxx">
            <div class="box1">
              <p>{{item.OpreateBillName}}</p>
              <p>{{item.StartTime}}</p>
            </div>
            <div class="box2">
              <p>{{item.Principal}}</p>
              <p>{{item.EndTime}}</p>
            </div>
            <div class="box3">
              <p>{{item.CurrentIndex}}/{{item.AllCount}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import api from "../../axios/api";
export default {
  data() {
    return {
      finishidata: [],
    //   detailid: ""
    };
  },
  created() {
    this.$get(api.getcurrentlist).then(res => {
      // console.log(res);
      if (res.data.state == 200) {
        this.finishidata = res.data.data;
        // console.log(this.finishidata)
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  methods: {
    // detail(e) {
    //   this.detailid = e;
    // }
  }
};
</script>



<style scoped>
.box ul li .bbooxx {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.box1,
.box2 {
  flex: 5;
  text-align: left;
  padding-left: 5px;
}
.box3 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>