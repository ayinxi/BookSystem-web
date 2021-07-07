<template>
  <div>
    <Home />
    <div>
      <el-container style="margin: 0% 5%">
        <el-header
          ><el-row style="display: flex">
            <el-col :span="5" @click.native="goBackToIndex" style="text-align: center;"
              >全部商品分类</el-col
            >
            <el-col>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="网络文学" name="first"></el-tab-pane>
                <el-tab-pane label="教育" name="second"></el-tab-pane>
                <el-tab-pane label="小说" name="third"></el-tab-pane>
                <el-tab-pane label="文艺" name="fourth"></el-tab-pane>
                <el-tab-pane label="青春文学/动漫" name="fifth"></el-tab-pane>
              </el-tabs>
            </el-col> </el-row
        ></el-header>
        <el-container>
          <el-aside width="25%">
            <img src="../assets/kuku.png" />
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
                ><el-input-number
                  v-model="lists[0].num"
                  :min="1"
                  :max="10"
                ></el-input-number
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
import Home from "../views/Home.vue";
export default {
  components: {
    Home,
  },
  data() {
    return {
      lists: [
        {
          num: 1,
        },
        {
            num:2,
        }
      ],
    };
  },
  methods: {
      goBackToIndex(){
       this.$router.push("/index");
    }
  },
};
</script>
<style acoped>
img {
  width: 100%;
  height: 95%;
}
</style>
