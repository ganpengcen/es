<template>
  <div>
    <ul class="my_msg">
      <li>
        <div></div>
        <div>
          <p>系统消息</p>
          <p>您有一条新消息</p>
        </div>
      </li>
      <li>
        <div></div>
        <div>
          <p>系统消息</p>
          <p>您有一条新消息</p>
        </div>
      </li>
      <li>
        <div></div>
        <div>
          <p>系统消息</p>
          <p>您有一条新消息</p>
        </div>
      </li>
      <li>
        <div></div>
        <div>
          <p>系统消息</p>
          <p>您有一条新消息</p>
        </div>
      </li>
      <li>
        <div></div>
        <div>
          <p>系统消息</p>
          <p>您有一条新消息</p>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {

    };
  }
};
</script>


<style>
.my_msg li{
   display: flex;
   width: 100%;
   text-align: left;
   border-bottom: 1px solid #999;
   color: #343434;
   font-size: 14px;
}
.my_msg li p:nth-child(2){
    line-height: 30px;
}
.my_msg li div:nth-child(1){
    flex: 1;
}
.my_msg li div:nth-child(2){
    flex: 6;
}
.my_msg li div:nth-child(2) p:nth-child(1){
    font-weight: bold;
}
</style>



<style scoped>
</style>
