<template>
  <div>
    <Home />
    <div>
      <el-container style="margin: 0% 5%">
        <el-header
          ><el-row style="display: flex">
            <el-col
              :span="5"
              @click.native="goBackToIndex"
              style="text-align: center"
              >全部商品分类</el-col
            >
            <el-col>
              <el-menu
                :default-active="activeIndex1"
                class="el-menu-demo"
                mode="horizontal"
              >
                <el-menu-item index="1" @click.native="NetworkFilter"
                  >网络文学</el-menu-item
                >
                <el-menu-item index="2" @click.native="EducationFilter"
                  >教育</el-menu-item
                >
                <el-menu-item index="3" @click.native="NovelFilter"
                  >小说</el-menu-item
                >
                <el-menu-item index="4" @click.native="LandAFilter"
                  >文艺</el-menu-item
                >
                <el-menu-item index="5" @click.native="YandCFilter"
                  >青春/动漫</el-menu-item
                >
              </el-menu>
            </el-col>
          </el-row>
          <el-row style="display: flex; padding: 0% 26%">
            <el-link :underline="false" @click.native="goToShopIndex"
              >店铺名称</el-link
            >
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="25%">
            <img class="imgStyle" src="../assets/kuku.png" />
          </el-aside>
          <el-main>
            <h2>图书名称</h2>
            <p>作者</p>
            <p>
              这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介
            </p>
            <p>图书分类1分类2</p>
            <p>价格</p>
            <el-row :gutter="20" type="flex" padding="10px 0">
              <el-col :span="5"
                ><el-input-number v-model="num" :min="1"></el-input-number
              ></el-col>
              <el-col :span="3"
                ><el-button type="primary" class="el-icon-shopping-cart-2"
                  >加入购物车</el-button
                ></el-col
              >
              <el-col :span="4"
                ><el-button type="danger">立即购买</el-button></el-col
              >
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import Home from "./Home.vue";
export default {
  components: {
    Home,
  },
  data() {
    return {
      activeIndex1: "",
      num: 1,
    };
  },
  methods: {
    goBackToIndex() {
      this.$router.push("/");
    },
    NetworkFilter() {
      this.$router.push({ path: "/", query: { activeIndex1: "1" } });
    },
    EducationFilter() {
      this.$router.push({ path: "/", query: { activeIndex1: "2" } });
    },
    NovelFilter() {
      this.$router.push({ path: "/", query: { activeIndex1: "3" } });
    },
    LandAFilter() {
      this.$router.push({ path: "/", query: { activeIndex1: "4" } });
    },
    YandCFilter() {
      this.$router.push({ path: "/", query: { activeIndex1: "5" } });
    },
    goToShopIndex() {
      this.$router.push("/shopIndex");
    },
  },
};
</script>
<style acoped>
.imgStyle {
  width: 100%;
  height: 95%;
}
</style>
