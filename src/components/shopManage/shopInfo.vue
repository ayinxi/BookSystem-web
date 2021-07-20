<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div class="title">管理平台</div>
    </div>
    <div style="margin: 2% 10%">
      <el-page-header @back="goToManage" content="店铺管理"></el-page-header>
    </div>
    <div style="margin: 0% 10%">
      <el-card>
        <el-container>
          <el-aside
            style="
            display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              vertical-align: middle;
            "
          >
            <img class="avatar" :src="this.shopInfo.avatar_b" />
          </el-aside>
          <el-main>
            <p class="pStyle">店铺名称：{{ this.shopInfo.shop_name }}</p>
            <p class="pStyle">店主名称：{{ this.shopInfo.shopper_name }}</p>
            <p class="pStyle1">
              店铺评分：
              <el-rate
                v-model="this.shopInfo.rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
                style="width: 300px"
              >
              </el-rate>
            </p>
            <el-button type="text">更改店铺信息</el-button>
          </el-main>
        </el-container>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      isLoading: false,
      shopInfo: {
        shop_name: "",
        shopper_name: "",
        avatar_b: "",
        rate: 0.1,
      },
    };
  },
  computed: {
    hasUsername() {
      return this.$store.state.username;
    },
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage");
    },
    getShopInfo() {
      axios({
        url: this.$store.state.yuming + "/shop/getPassed",
        method: "GET",
        params: {
          username: this.hasUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.shopInfo = data;
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getShopInfo();
    this.isLoading = false;
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
.logo3 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 250px;
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
.title {
  font-size: 35px;
  padding: 30px 10px;
  position: relative;
  left: 180px;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>