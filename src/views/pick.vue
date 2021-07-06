<template>
    <div style="display:flex;align-items:center">
     <el-card shadow="hover" class="pick-card">
         图书选购
     </el-card>
     <el-card shadow="hover" class="pick-card">
         后台管理
     </el-card>
    </div>
</template>

<script>
import{ Button,Card } from "element-ui"
export default {
    components:{
        "el-button": Button,
        "el-card": Card
    }
}
</script>

<style acoped>
.pick-card {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}
</style> 
