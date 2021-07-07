<template>
  <div>
    <Home />
    <div>
      <el-container style="margin: 5%">
        <el-header>
          <el-container>
            <el-aside width="18%" height="50px" float="left">
              全部商品分类
            </el-aside>
            <el-main float="left">
              <el-menu :default-active="activeIndex" mode="horizontal">
                <el-menu-item index="1">网络文学</el-menu-item>
                <el-menu-item index="2">教育</el-menu-item>
                <el-menu-item index="3">小说</el-menu-item>
                <el-menu-item index="4">文艺</el-menu-item>
                <el-menu-item index="5">青春文学/动漫</el-menu-item>
              </el-menu>
            </el-main>
          </el-container>
        </el-header>
        <el-container>
          <el-aside width="18%" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>网络文学</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">男频</el-menu-item>
                  <el-menu-item index="1-2">女频</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>教育</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">教材</el-menu-item>
                  <el-menu-item index="2-2">教辅资料</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>小说</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">中国小说</el-menu-item>
                  <el-menu-item index="3-2">外国小说</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>文艺</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">文学</el-menu-item>
                  <el-menu-item index="4-2">艺术</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
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
              <el-aside style="width: 14%; float: left; height: 200px">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
            </el-container>
            <el-container>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main>
              <el-aside style="width: 14%; float: left">
                <img src="../assets/kuku.png" />
              </el-aside>
              <el-main style="width: 10%; float: left">
                <el-link :underline="false" class="book-name">图书名称</el-link>
                <p>作者</p>
                <p>图书分类1分类2</p>
                <p>价格</p>
              </el-main> </el-container
            ><el-pagination layout="prev, pager, next" :total="500">
            </el-pagination>
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
      bookImgList: [], //图书图片
      bookNameList: [], //图书名称
      bookAuthorList: [], //图书作者
      bookClassificationList: [], //图书所属种类
      bookPublicationTime: [], //图书出版时间
      bookPrice: [], //图书价格
    };
  },
  methods: {
    onClick() {},
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
img {
  width: 100%;
  height: 95%;
}
</style>