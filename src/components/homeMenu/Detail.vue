
<template>
    <div class="Content"  v-html="innovation.Content">
        
    </div>
</template>

<script>
import api from "../../axios/api";
export default {
    name: "Detail",
    data(){
        return{
            info:'',
            innovation:''
        }
    },
    created(){
        this.info = this.$route.query.id;
        this.getdocins();
    // console.log(this.$route.query.id)

    },
    methods:{
        getdocins(){
            this.$get(api.getdocins+'/'+this.info).then(res => {
        if (res.data.state == 200) {
          this.innovation = res.data.data;
            console.log(this.innovation);
        } else {
          this.$message.error(res.data.msg);
        }
      });
        }
    }

}
</script>

<style scoped>
    .Content{
        text-align: left ;
    }
</style>

