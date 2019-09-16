<template>
  <div class="header">
    <p>{{ title }}</p>
  </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            //定义变量
            return {}
        },
      props: {
        title: String,
      },
        //计算属性
        computed: {},
        //html加载前，初始数据获取
       // created: {},
        //html加载后,页面初始化方法
        mounted() {
        },
        //监听
        watch: {},
        //调用方法
        methods: {}
    }
</script>

<style scoped>
  .header {
    background: #409EFF;
    width: 100%;
    display: block;
    height: 5rem;
    text-align: center;

  }
  .header p {
    font-size: 22px;
    color: white;
    line-height: 5rem;
  }
</style>
