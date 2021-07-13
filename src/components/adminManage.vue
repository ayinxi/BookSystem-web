<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img width="250px" src="../assets/logo.png" />
        <div class="title">管理平台</div>
      </div>
      <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar"></div></el-aside>
            <el-main>
              <div class="box3">
            <h2>欢迎您，管理员</h2>
            <el-button type="text">退出登录</el-button>
          </div>
          <div class="item" style="font-size: 15px">
            在此处，您可以选择使用 分类管理 或 商家管理 功能。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-button type="text" @click="gotoClass">
        <el-card class="box-card2">
          <i class="iconfont-fenlei" style="font-size: 50px; margin: 50px"/>
          <div class="text item">
            分类管理
          </div>
          <i style="color: #909399">添加、修改、删除一、二级书籍分类。</i>
        </el-card>
        </el-button>
        <el-button type="text" @click="gotoMerchant">
        <el-card class="box-card2">
          <i class="iconfont-shangpu" style="font-size: 50px; margin: 50px"/>
          <div class="text item">
            商家管理
          </div>
          <i style="color: #909399">处理用户成为商家的申请。</i>
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
  methods:{
    gotoClass() {
      this.$router.push("/manageClass");
    },
    gotoMerchant() {
      this.$router.push("/manageMerchant");
    },
  },
};
</script>

<style>
.home {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  
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
  justify-content: space-between;
  margin: 20px;
}

.title{
  font-size: 35px;
  padding: 30px 10px;
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
  width: 4px;
  height: 100px;
  background: #3d678a;
  display: inline-block;
  margin-top: 35px;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}

</style>