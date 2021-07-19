<template>
  <div v-loading="isLoading">
    <div class="bbb"></div>
    <div class="header">
      <div class="hasRole ? search2 :search2">
        <el-input
          placeholder="给孩子的第一本编程书籍"
          v-model="input"
          style="width: 500px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click.native="goToSearch"
          >
          </el-button>
        </el-input>
      </div>
      <div v-if="hasRole">
        <el-row class="shopping">
          <el-col :span="10">
            <el-badge :value="12" class="shopping">
              <el-button size="meduim" icon="el-icon-shopping-cart-2"
                >我的购物车</el-button
              >
            </el-badge>
          </el-col>
          <el-col :span="4" class="pageperson">
            <el-button
              size="meduim"
              class="pageperson"
              icon="el-icon-s-custom"
              @click="gotoPersonPage"
              >个人主页</el-button
            >
          </el-col>
          <el-col @click.native="loginOut" style="margin-left: 30px">
            <i class="iconfont-tuichu" style="font-size: 20px" />
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row class="hasNoRole">
          <el-col>
            <el-button size="meduim" @click="gotoSign">注册</el-button>
          </el-col>
          <el-col style="margin: 20px 0">
            <el-button size="meduim" class="pageperson" @click="gotoLogin"
              >登陆</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>

    <div>
      <div>
        <el-container style="margin: 0% 5%">
          <el-header style="padding: 0">
            <el-row class="rowStyle1">
              <el-col class="colStyle" @click.native="showAll"
                >全部商品分类</el-col
              >
              <el-col>
                <el-menu
                  :default-active="activeIndex1"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect1"
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
            </el-row> </el-header
          ><el-main v-if="this.displayList.length == 0"
            ><el-row>
              <p>未找到相关的书籍</p>
            </el-row></el-main
          >
          <el-main v-if="this.displayList.length != 0">
            <el-row class="rowStyle" type="flex">
              <el-col
                :span="24"
                v-for="book in displayList.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )"
                :key="book.Name"
              >
                <el-container>
                  <el-header
                    style="width: 100%; height: 200px; align-items: center"
                  >
                    <el-image
                      class="imgStyle1"
                      :src="book.Img"
                      @click.native="goToBookInfo"
                    >
                    </el-image>
                  </el-header>
                  <el-main
                    style="color: black; padding-top: 0; text-align: center"
                  >
                    <el-link
                      :underline="false"
                      class="book-name"
                      @click="goToBookInfo()"
                      >{{ book.Name }}</el-link
                    >
                    <p style="color: rgb(128, 192, 192); margin: 0%">
                      {{ book.Author }}
                    </p>
                    <p style="color: red; font-weight: 1000; margin: 0%">
                      ￥{{ book.Price }}
                    </p>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="this.displayList.length"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      isLoading: false,
      input: "",
      Lists: [
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "有本事",
          Author: "冯唐",
          ClassOne: "网络文学",
          ClassTwo: "男频",
          Price: 10,
          PubTime: 2021,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本2号",
          Author: "李四",
          ClassOne: "网络文学",
          ClassTwo: "女频",
          Price: 11,
          PubTime: 2020,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本3号",
          Author: "王五",
          ClassOne: "小说",
          ClassTwo: "中国小说",
          Price: 12,
          PubTime: 2019,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本4号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2018,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本5号",
          Author: "赵六",
          ClassOne: "教育",
          ClassTwo: "教材",
          Price: 13,
          PubTime: 2021,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本6号",
          Author: "赵六",
          ClassOne: "教育",
          ClassTwo: "教辅资料",
          Price: 13,
          PubTime: 2020,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本7号",
          Author: "赵六",
          ClassOne: "文艺",
          ClassTwo: "文学",
          Price: 13,
          PubTime: 2019,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本8号",
          Author: "赵六",
          ClassOne: "文艺",
          ClassTwo: "艺术",
          Price: 13,
          PubTime: 2018,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本9号",
          Author: "赵六",
          ClassOne: "青春/动漫",
          ClassTwo: "青春",
          Price: 13,
          PubTime: 2021,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本10号",
          Author: "赵六",
          ClassOne: "青春/动漫",
          ClassTwo: "动漫",
          Price: 13,
          PubTime: 2020,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本11号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2019,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本12号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2018,
        },
        {
          Img: require("../assets/youbenshi.jpg"),
          Name: "书本13号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2021,
        },
      ],
      displayList: [],
    };
  },
  computed: {
    hasRole() {
      return this.$store.state.roleHasLoad;
    },
    hasLogin() {
      return this.$store.state.token;
    },
  },
  methods: {
    goToSearch() {
      this.$router.push("/searchBook");
    },
    gotoSign() {
      this.$router.push("/sign");
    },
    gotoLogin() {
      this.$router.push("/login");
    },
    gotoPersonPage() {
      this.$router.push("/person");
    },
    loginOut() {
      this.isLoading = true;
      this.$store.commit("clearCache");
      sessionStorage.removeItem("token");
      this.isLoading = false;
    },
  },
  created() {
    var query = this.$router.query;
    this.input = query.input;
    this.displayList = this.Lists.filter(
      (item) =>
        item.Name.includes(this.input) | item.Author.includes(this.input)
    );
  },
};
</script>

<style>
.bbb {
  background: url("../assets/3.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
  height: 20%;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-left: 500px;
}
.search2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-left: 350px;
}
.shopping {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.hasNoRole {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-left: 50px;
}
.pageperson {
  display: flex;
  justify-content: center;
  margin: 20px;
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
