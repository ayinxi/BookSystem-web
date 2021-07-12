<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img width="250px" src="../assets/logo.png" />
        <span>商城管理</span>
      </div>
      <div>
        <el-card class="box-card1" shadow="never">
          <el-container>
            <el-aside width="35px"><div class="verticalBar"></div></el-aside>
            <el-main>
              <div class="box3">
            <h2>欢迎您，管理员</h2>
            <el-button type="text">退出</el-button>
          </div>
          <div class="item" style="font-size: 15px">
            在此处，您可以选择使用 分类管理 或 商家管理 功能。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-button type="text">
        <el-card class="box-card2" shadow="hover">
          <div class="text item">
            分类管理
          </div>
        </el-card>
        </el-button>
        <el-button type="text">
        <el-card class="box-card2" shadow="hover">
          <div class="text item">
            商家管理
          </div>
        </el-card>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods:{},
};
</script>

<style>
.home {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  
  display: flex;
  justify-content: center;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.header{
  display: flex;
  justify-content: flex-start;
  margin: 20px;
}

.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box2{
  display: flex;
  justify-content: center;
}

.box-card1 {
  width: 700px;
  margin: 20px;
}

.box-card2 {
  width: 340px;
  margin: 10px;
}

.box3{
  display: flex;
  justify-content: space-between;
}

    .verticalBar {
        width: 3px;
        height: 100px;
        background: rgb(60, 59, 105);
        display: inline-block;
        margin-top: 35px;
        vertical-align: top;
        margin-right: 0px;
        margin-left: 30px;
        border-radius: 20%;
    }


</style>