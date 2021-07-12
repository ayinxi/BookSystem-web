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
    <div style="margin: 5% 18%">
      <el-col class="el-colStyle">
        <el-card class="el-cardStyle" shadow="hover" @click.native="goToBookM"
          ><span class="el-icon-s-management"></span>
          <span class="spanStyle">图书管理</span>
        </el-card>
      </el-col>
      <el-col class="el-colStyle">
        <el-card class="el-cardStyle" shadow="hover" @click.native="goToOrderM"
          ><span class="el-icon-s-order"></span>
          <span class="spanStyle">订单管理</span></el-card
        >
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
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
</style>

