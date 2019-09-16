<template>
  <div class="standard">
    <ul v-for="(item,index) in arrs" :key="index">
      <li>
          <ul v-for="(item1,index) in item.SubStandards" :key="index">
              <li class="lis">
                  <h2>{{item1.Name}}</h2>
                  <p>{{item1.Controls}}</p>
                  <p>{{item1.Engineering}}</p>
                  <p>{{item1.Accident}}</p>
                  <p>{{item1.Individual}}</p>
                  
                  </li>
          </ul>
          <!-- {{item.SubStandards}} -->
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../../axios/api";
export default {
  data() {
    return {
      postID: "",
      arrs: []
    };
  },
  created() {
    this.postID = this.$route.query.BillID;
    
  },
  mounted(){
      this.gettasksubover();
  },
  methods: {
    gettasksubover() {
      this.$get(api.gettasksubover + "/" + this.postID).then(res => {
        if (res.data.state == 200) {
          this.arrs = res.data.data;
          console.log("res.data.data",res)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style>
.standard .lis{
    margin-bottom: 20px
}
.standard .lis h2{
    background-color: rgb(17, 187, 54);
    line-height: 36px;
    font-weight: bold;
}
.standard .lis p{
    text-align: left;
    padding: 0 8px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
</style>

<style scoped>
</style>

