<template>
  <div>
    <Home />
    <div>
      <el-container style="margin: 0% 5%">
        <el-header style="padding: 0">
          <el-row class="rowStyle1">
            <el-col class="colStyle" @click.native="goBackToIndex"
              >全部商品分类</el-col
            >
            <el-col>
              <el-menu
                :default-active="activeIndex1"
                class="el-menu-demo"
                mode="horizontal"
              >
                <el-menu-item
                  index="1"
                  @click.native="NetworkFilter"
                  style="color: rgb(250, 128, 114); font-weight: 1000"
                  >网络文学</el-menu-item
                >
                <el-menu-item
                  index="2"
                  @click.native="EducationFilter"
                  style="color: rgb(250, 128, 114); font-weight: 1000"
                  >教育</el-menu-item
                >
                <el-menu-item
                  index="3"
                  @click.native="NovelFilter"
                  style="color: rgb(250, 128, 114); font-weight: 1000"
                  >小说</el-menu-item
                >
                <el-menu-item
                  index="4"
                  @click.native="LandAFilter"
                  style="color: rgb(250, 128, 114); font-weight: 1000"
                  >文艺</el-menu-item
                >
                <el-menu-item
                  index="5"
                  @click.native="YandCFilter"
                  style="color: rgb(250, 128, 114); font-weight: 1000"
                  >青春/动漫</el-menu-item
                >
              </el-menu>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                @click.native="goBackToIndex"
                style="cursor: pointer"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="NetworkFilter"
                style="cursor: pointer"
                >{{ this.Lists.ClassOne }}</el-breadcrumb-item
              >
              <el-breadcrumb-item @click.native="test" style="cursor: pointer"
                >{{ this.Lists.ClassTwo }}</el-breadcrumb-item
              >
              <el-breadcrumb-item>图书名称</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
        </el-header>
        <el-container style="margin-top: 3%">
          <el-aside width="25%">
            <img class="imgStyle3" src="../assets/kuku.png" />
          </el-aside>
          <el-main
            ><el-link :underline="false" @click.native="goToShopIndex"
              >店铺名称</el-link
            >
            <h2>{{ this.Lists.Name }}</h2>
            <p style="color: gray; margin: 0%">{{ this.Lists.Author }}</p>
            <p>
              这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介
            </p>
            <p style="color: red; font-weight: 1000; margin: 0%">
              ￥{{ this.Lists.Price }}
            </p>
            <el-row :gutter="20" type="flex" style="padding:10px 0">
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
      Lists: {
        Img: "",
        Name: "",
        Author: "",
        ClassOne: "",
        ClassTwo: "",
        Price: 0,
        PubTime: 0,
      },
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
    test() {
      this.$router.push({ path: "/", query: { activeIndex2: "1-1" } });
    },
  },
};
</script>
<style acoped>
.imgStyle3 {
  width: 100%;
  height: 95%;
}
.rowStyle1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(205, 92, 92);
}
.colStyle {
  text-align: center;
  font-weight: 1000;
  width: 21.93%;
  color: white;
  cursor: pointer;
}
</style>
