<template>
  <div>
    <Home />
    <div>
      <el-container style="margin: 0% 5%">
        <el-header>
          <el-row
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-col :span="5" style="text-align: center" @click="goBackToIndex"
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
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="18%" style="background-color: white">
            <el-menu class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span>网络文学</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">男频</el-menu-item>
                  <el-menu-item index="1-2">女频</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-medal-1"></i>
                  <span>教育</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">教材</el-menu-item>
                  <el-menu-item index="2-2">教辅资料</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span>小说</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">中国小说</el-menu-item>
                  <el-menu-item index="3-2">外国小说</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-collection"></i>
                  <span>文艺</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">文学</el-menu-item>
                  <el-menu-item index="4-2">艺术</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-magic-stick"></i>
                  <span>青春文学/动漫</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">青春文学</el-menu-item>
                  <el-menu-item index="5-2">动漫</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-container>
              <el-aside
                style="width: 14%; float: left; height: 200px"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >图书名称</el-link
                >
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main> </el-container
            ><el-container
              v-for="book in Lists"
              :key="book"
              display="flex"
              float="left"
              width="24%"
            >
              <el-aside
                style="width: 14%; float: left"
                @click.native="goToBookInfo"
              >
                <img class="imgStyle" :src="book.Img" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link
                  :underline="false"
                  class="book-name"
                  @click.native="goToBookInfo"
                  >{{ book.Name }}</el-link
                >
                <p>{{ book.Author }}</p>
                <p>{{ book.ClassOne }}->{{ book.ClassTwo }}</p>
                <p>{{ book.Price }}</p>
              </el-main>
            </el-container>
            <el-pagination layout="prev, pager, next" :total="500">
            </el-pagination>
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
      Lists: [
        {
          Img: require("../assets/kuku.png"),
          Name: "书本1号",
          Author: "张三",
          ClassOne: "小说",
          ClassTwo: "男频",
          Price: 10,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本2号",
          Author: "李四",
          ClassOne: "小说",
          ClassTwo: "女频",
          Price: 11,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本3号",
          Author: "王五",
          ClassOne: "小说",
          ClassTwo: "中国小说",
          Price: 12,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本4号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
        },
      ],
      tests: [1, 2, 3, 4, 5],
      activeName: "",
    };
  },
  methods: {
    onClick() {},
    handleClick() {},
    goBackToIndex() {
      this.$router.push("/");
    },
    goToBookInfo() {
      this.$router.push("/bookInfo");
    },
  },
};
</script>

<style acoped>
.el-pagination {
  text-align: center;
}
.book-name {
  font-size: 200%;
}
.imgStyle {
  width: 100%;
  height: 95%;
}
li {
  list-style: none;
}
</style>