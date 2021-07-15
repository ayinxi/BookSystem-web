<template>
  <div>
    <div class="header">
      <div class="logo4">
        <img width="250px" src="../assets/jwbc.png" />
      </div>
      <div>
            <el-button
              size="meduim"
              class="pageperson"
              icon="el-icon-s-custom"
              @click="gotoPersonPage"
              >个人主页</el-button
            >
      </div>
    </div>
    <div style="margin: 3% 18%">
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
                您可以在本页面使用如下功能: 图书管理 或 订单管理 或 退款管理
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
      <el-row>
        <el-col :span="8" class="el-colStyle">
          <el-card class="el-cardStyle" shadow="hover" @click.native="goToBookM"
            ><p class="iconfont-chuangyexiangmu" style="font-size: 40px"></p>
            <p class="spanStyle">图书管理</p>
          </el-card>
        </el-col>
        <el-col :span="8" class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToOrderM"
            ><p class="iconfont-dingdan" style="font-size: 40px"></p>
            <p class="spanStyle">订单管理</p></el-card
          >
        </el-col>
        <el-col :span="8" class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToRefundM"
            ><p class="iconfont-shouhou" style="font-size: 40px"></p>
            <p class="spanStyle">退款管理</p></el-card
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
    goToBookM() {
      this.$router.push("/bookM");
    },
    goToOrderM() {
      this.$router.push("/orderM");
    },
    goToRefundM(){
      this.$router.push("/refundM");
    }
  },
};
</script>

<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
}
.logo4 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right:315px;
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
.el-colStyle {
  display: flex;
  justify-content: center;
}
.el-cardStyle {
  min-width: 70%;
  display: flex;
  min-height: 100px;
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

