<template>
  <div>
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <el-button size="medium" @click.native="goToManage"
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 0% 10%">
      <el-container>
        <el-aside>
          <img class="imgStyle" :src="this.shop.shopimg" />
        </el-aside>
        <el-main>
          <p class="pStyle">店铺名称：{{ this.shop.shopname }}</p>
          <p class="pStyle">店主名称：{{ this.shop.shoppername }}</p>
          <p class="pStyle1">
            店铺评分：
            <el-rate
              v-model="this.shop.shoprate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="width: 300px"
            >
            </el-rate>
          </p>
          <el-button tpye="text">更改店铺信息</el-button>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shop: {
        shopname: "这是一家好店",
        shoppername:"店主",
        shopimg: require("../../assets/kuku.png"),
        shoprate: 3.7,
      },
    };
  },
  methods:{
      goToManage(){
          this.$router.push("/shopManage");
      }
  }
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
.logo3 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 306px;
}
.imgStyle {
  width: 100%;
  height: 95%;
}
.pStyle {
  text-align: left;
  font-size: 25px;
}
.pStyle1 {
  display: flex;
  justify-content: left;
  align-items: left;
  text-align: left;
  vertical-align: middle;
  font-size: 25px;
}
.el-rate__icon {
  font-size: 25px;
}
.el-rate__text {
  font-size: 25px;
}
</style>