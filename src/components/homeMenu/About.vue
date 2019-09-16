<template>
    <div class="safemanage">
        <div class="box">
            <h2><i class="iconfont iconanquanguanli"></i></h2>
            <p>安全管理</p>
        </div>
        <ul>
            <li>
                <span>版本说明</span>
                <span><i class="el-icon-arrow-right"></i></span>
            </li>
            <li>
                <span>去评分</span>
                <span><i class="el-icon-arrow-right"></i></span>
            </li>
            <li>
                <span>版本更新</span>
                <span><i class="el-icon-arrow-right"></i></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'About',
    data(){
        return{

        }   
    }
}
</script>


<style>
.safemanage .box{
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
}
.safemanage .box h2 i{
    font-size: 40px;
    color: rgba(17, 148, 104, 0.733);
}
.safemanage .box p{
    font-weight: bold;
    line-height: 26px;
}
.safemanage ul li{
    width: 100%;
    text-align: left;
    padding: 0 8px 0 12px;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    font-size: 14px;
    box-sizing: border-box;
    color: #666;
}
.safemanage ul li span:nth-child(2){
    float: right;
}
</style>


<style scoped>

</style>
