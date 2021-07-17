<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoUserIndex"
        content="我的订单"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div>
      <el-row style="margin-left: 5%">
        <el-col :span="3">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          
          >
            <el-menu-item index="1">
              <i class="iconfont-dingdan1"></i>
              <span slot="title" style="margin-left: 10px">全部订单</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="iconfont-daifahuo1"></i>
              <span slot="title" style="margin-left: 10px">待发货</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="iconfont-daishouhuo1"></i>
              <span slot="title" style="margin-left: 10px">待收货</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="iconfont-xiaoxi"></i>
              <span slot="title" style="margin-left: 10px">待评价</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="iconfont-shouhou1"></i>
              <span slot="title" style="margin-left: 10px">退款</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  prop: {
    orderId: String,
  },
  computed: {
  },
  method: {
    //返回个人主页
    gotoUserIndex() {
      this.$router.push("/person");
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>