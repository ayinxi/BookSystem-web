<template>
  <div>
    <div class="header1">
      <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
      <div>
        <el-row class="shopping">
          <el-col :span="10"> </el-col>
          <el-col :span="5" class="pageperson">
            <el-button
              size="meduim"
              class="pageperson"
              icon="el-icon-s-custom"
              @click="gotoPersonPage"
              >个人主页</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin: 0% 18%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span
              ><span
                style="font-weight: 1000; color: #ff623e; font-size: 30px"
                >{{ shopname }}</span
              >
              <p style="font-weight: 1000">
                你可以在本页面使用如下功能: 图书管理 或 订单管理
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
      <el-row>
        <el-col class="el-colStyle">
          <el-card class="el-cardStyle" shadow="hover" @click.native="goToBookM"
            ><p class="iconfont-chuangyexiangmu" style="font-size: 40px"></p>
            <p class="spanStyle">图书管理</p>
          </el-card>
        </el-col>
        <el-col class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToOrderM"
            ><p class="iconfont-dingdan" style="font-size: 40px"></p>
            <p class="spanStyle">订单管理</p></el-card
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopname: "这是一家好店",
    };
  },
  methods: {
    gotoPersonPage() {
      this.$router.push("/person");
    },
    goToIndex() {
      this.$router.push("/");
    },
    goToBookM() {
      this.$router.push("/bookM");
    },
    goToOrderM() {
      this.$router.push("/orderM");
    },
  },
};
</script>

<style acoped>
.header1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.shopping {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.index {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.pageperson {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.el-colStyle {
  display: flex;
  width: 50%;
  justify-content: center;
}
.el-cardStyle {
  min-width: 50%;
  display: flex;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
}
.spanStyle {
  font-size: 30px;
}
.verticalBar1 {
  width: 3px;
  height: 100%;
  background: rgb(60, 59, 105);
  display: inline-block;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}
</style>

