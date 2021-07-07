<template>
  <div>
    <Home />
    <div>
      <el-container style="border: 1px solid #eee; margin: 5%">
        <el-header>全部商品分类</el-header>
        <el-container>
          <el-aside width="40%">
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
              <el-col :span="6"
                ><el-input-number v-model="num" :min="1"></el-input-number
              ></el-col>
              <el-col :span="4"
                ><el-button type="primary">加入购物车</el-button></el-col
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
      num: 1,
    };
  },
  methods: {},
};
</script>
<style acoped>
img {
  width: 100%;
  height: 95%;
}
</style>
