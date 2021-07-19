<template>
  <div>
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
    </div>
    <div>
      <el-container style="margin: 0% 5%">
        <el-container>
          <el-aside width="18%">
            <el-row class="rowStyle1">
              <el-col class="colStyle" @click.native="showAll"
                ><p>全部商品分类</p></el-col
              >
            </el-row>
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="activeIndex2"
              @select="handleSelect2"
            >
              <el-menu-item index="1" @click.native="NetworkFilter">
                <i class="el-icon-reading"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >网络文学</span
                >
              </el-menu-item>
              <el-menu-item
                index="1-1"
                @click.native="NanPinFilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >男频</el-menu-item
              >
              <el-menu-item
                index="1-2"
                @click.native="NvPinFilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >女频</el-menu-item
              >
              <el-menu-item index="2" @click.native="EducationFilter">
                <i class="el-icon-medal-1"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >教育</span
                >
              </el-menu-item>
              <el-menu-item
                index="2-1"
                @click.native="JiaoCaiFilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >教材</el-menu-item
              >
              <el-menu-item
                index="2-2"
                @click.native="JiaoFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >教辅资料</el-menu-item
              >
              <el-menu-item index="3" @click.native="NovelFilter">
                <i class="el-icon-notebook-1"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >小说</span
                >
              </el-menu-item>
              <el-menu-item
                index="3-1"
                @click.native="ChinaFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >中国小说</el-menu-item
              >
              <el-menu-item
                index="3-2"
                @click.native="ForeginFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >外国小说</el-menu-item
              >
              <el-menu-item index="4" @click.native="LandAFilter">
                <i class="el-icon-collection"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >文艺</span
                >
              </el-menu-item>
              <el-menu-item
                index="4-1"
                @click.native="LiteratureFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >文学</el-menu-item
              >
              <el-menu-item
                index="4-2"
                @click.native="ArtFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >艺术</el-menu-item
              >
              <el-menu-item index="5" @click.native="YandCFilter">
                <i class="el-icon-magic-stick"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >青春/动漫</span
                >
              </el-menu-item>
              <el-menu-item
                index="5-1"
                @click.native="YouthFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >青春</el-menu-item
              >
              <el-menu-item
                index="5-2"
                @click.native="CartoonFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >动漫</el-menu-item
              >
              <el-menu-item index="6">
                <i class="el-icon-date"></i>
                <span
                  slot="title"
                  style="
                    color: rgb(250, 128, 114);
                    font-weight: 1000;
                    font-size: 20px;
                  "
                  >按出版时间分</span
                >
              </el-menu-item>
              <el-menu-item
                index="6-1"
                @click.native="TwoZeroTwoOneFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >2021年出版</el-menu-item
              >
              <el-menu-item
                index="6-2"
                @click.native="TwoZeroTwoZeroFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >2020年出版</el-menu-item
              >
              <el-menu-item
                index="6-3"
                @click.native="TwoZeroOneNineFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >2019年出版</el-menu-item
              >
              <el-menu-item
                index="6-4"
                @click.native="TwoZeroOneEightFuilter"
                style="color: rgb(233, 150, 122); font-weight: 1000"
                >2018年及以前出版</el-menu-item
              >
            </el-menu>
          </el-aside>
          <el-main>
            <el-row style="margin-bottom: 5%">
              <el-col :span="17">
                <el-carousel
                  :interval="5000"
                  arrow="never"
                  height="400px"
                  class="carouselStyle"
                >
                  <el-carousel-item v-for="item in photoList" :key="item.Name">
                    <el-image class="imgStyle2" :src="item.Img"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="7">
                <el-card class="cStyle">
                  <el-row style="height: 40px; margin: 5%"
                    ><el-col :span="4"
                      ><i class="iconfont-guanjun" style="font-size: 40px"></i
                    ></el-col>
                    <el-col :span="11" style="text-align: center; height: 40px"
                      ><p
                        style="
                          font-weight: 1000;
                          margin: 0%;
                          font-size: 20px;
                          height: 40px;
                          line-height: 40px;
                        "
                      >
                        今日销量冠军
                      </p></el-col
                    >
                  </el-row>
                  <el-row style="height: 270px">
                    <el-image
                      class="tscStyle"
                      :src="todaySalesChampion.Img"
                    ></el-image>
                  </el-row>
                  <el-row style="text-align: center">
                    <p style="color: black; margin: 1%">
                      {{ todaySalesChampion.Name }}
                    </p>
                    <p style="color: rgb(128, 192, 192); margin: 0%">
                      {{ todaySalesChampion.Author }}
                    </p>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <p>新书上架</p>
            </el-row>
            <el-row class="rowStyle" type="flex">
              <el-col :span="6" v-for="book in newBookList" :key="book.Name">
                <el-container>
                  <el-header
                    style="width: 100%; height: 200px; align-items: center"
                  >
                    <el-image
                      class="imgStyle1"
                      :src="book.Img"
                      @click.native="goToBookInfo()"
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
          </el-main> </el-container
        ><el-footer style="margin: 3% 0%; padding: 0px">
          <el-row style="margin: 0% 0% 5%"
            ><el-menu
              :default-active="activeIndex1"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect1"
            >
              <el-menu-item
                index="1"
                @click.native="NetworkFilter2"
                style="color: rgb(250, 128, 114); font-weight: 1000"
                >网络文学</el-menu-item
              >
              <el-menu-item
                index="2"
                @click.native="EducationFilter2"
                style="color: rgb(250, 128, 114); font-weight: 1000"
                >教育</el-menu-item
              >
              <el-menu-item
                index="3"
                @click.native="NovelFilter2"
                style="color: rgb(250, 128, 114); font-weight: 1000"
                >小说</el-menu-item
              >
              <el-menu-item
                index="4"
                @click.native="LandAFilter2"
                style="color: rgb(250, 128, 114); font-weight: 1000"
                >文艺</el-menu-item
              >
              <el-menu-item
                index="5"
                @click.native="YandCFilter2"
                style="color: rgb(250, 128, 114); font-weight: 1000"
                >青春/动漫</el-menu-item
              >
            </el-menu>
          </el-row>
          <el-row class="rowStyle" type="flex">
            <el-col
              :span="4"
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
                    @click.native="goToBookInfo()"
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
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex1: "1",
      activeIndex2: " ",
      currentPage: 1,
      pageSize: 8,
      isLoading: false,
      input: " ",
      todaySalesChampion: {
        Img: require("../assets/youbenshi.jpg"),
        Name: "有本事",
        Author: "冯唐",
      },
      photoList: [
        { Img: require("../assets/1.jpg") },
        { Img: require("../assets/photo1.jpg") },
        { Img: require("../assets/photo2.jpg") },
        { Img: require("../assets/photo3.jpg") },
      ],
      newBookList: [
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
      ],
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
      displayList: [
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
      ],
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
      this.$router.push("/search");
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
    showAll() {
      this.activeIndex1 = "1";
      this.activeIndex2 = " ";
      this.currentPage = 1;
      this.displayList = this.Lists.filter(
        (item) => item.ClassOne == "网络文学"
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelect1() {
      this.activeIndex2 = " ";
    },
    handleSelect2() {
      this.activeIndex1 = " ";
    },
    goToBookInfo() {
      this.$router.push("/bookInfo");
    },
    NanPinFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "1-1" } });
    },
    NvPinFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "1-2" } });
    },
    JiaoCaiFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "2-1" } });
    },
    JiaoFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "2-2" } });
    },
    ChinaFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "3-1" } });
    },
    ForeginFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "3-2" } });
    },
    LiteratureFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "4-1" } });
    },
    ArtFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "4-2" } });
    },
    YouthFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "5-1" } });
    },
    CartoonFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "5-2" } });
    },
    TwoZeroTwoOneFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "6-1" } });
    },
    TwoZeroTwoZeroFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "6-2" } });
    },
    TwoZeroOneNineFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "6-3" } });
    },
    TwoZeroOneEightFuilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "6-4" } });
    },
    NetworkFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "1" } });
    },
    NetworkFilter2() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassOne == "网络文学"
      );
    },
    EducationFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "2" } });
    },
    EducationFilter2() {
      this.displayList = this.Lists.filter((item) => item.ClassOne == "教育");
    },
    NovelFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "3" } });
    },
    NovelFilter2() {
      this.displayList = this.Lists.filter((item) => item.ClassOne == "小说");
    },
    LandAFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "4" } });
    },
    LandAFilter2() {
      this.displayList = this.Lists.filter((item) => item.ClassOne == "文艺");
    },
    YandCFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "5" } });
    },
    YandCFilter2() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassOne == "青春/动漫"
      );
    },
  },
};
</script>

<style acoped>
.el-pagination {
  text-align: center;
}
.book-name {
  font-size: 100%;
}
.imgStyle1 {
  margin-left: 10%;
  width: 80%;
  height: 200px;
  cursor: pointer;
}
.rowStyle {
  display: flex;
  flex-wrap: wrap;
}
.rowStyle1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.colStyle {
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 1000;
  width: 100%;
  color: white;
  cursor: pointer;
  background-color: rgb(205, 92, 92);
  height: 60px;
}
.menu-item {
  color: rgb(188, 143, 143);
  font-weight: 1000;
}
.imgStyle2 {
  width: 100%;
  height: 100%;
}
.carouselStyle {
  border-radius: 10px;
}
.cStyle {
  height: 400px;
  position: relative;
  left: 20px;
  padding: 0px;
}
.tscStyle {
  height: 100%;
}
.el-card__body {
  padding: 5px;
}
.el-menu-item.is-active {
  background-color: rgb(231, 241, 252) !important;
}
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
</style>