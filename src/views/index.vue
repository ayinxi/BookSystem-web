<template>
  <div>
    <Home />
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
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="18%">
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="activeIndex2"
              :unique-opened="true"
              @select="handleSelect2"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >网络文学</span
                  >
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="1-1"
                    @click.native="NanPinFilter(this.Lists)"
                    style="color: rgb(233, 150, 122); font-weight: 1000"
                    >男频</el-menu-item
                  >
                  <el-menu-item
                    index="1-2"
                    @click.native="NvPinFilter"
                    style="color: rgb(233, 150, 122); font-weight: 1000"
                    >女频</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-medal-1"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >教育</span
                  >
                </template>
                <el-menu-item-group>
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
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >小说</span
                  >
                </template>
                <el-menu-item-group>
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
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-collection"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >文艺</span
                  >
                </template>
                <el-menu-item-group>
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
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-magic-stick"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >青春/动漫</span
                  >
                </template>
                <el-menu-item-group>
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
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-date"></i>
                  <span style="color: rgb(250, 128, 114); font-weight: 1000"
                    >按出版时间分</span
                  >
                </template>
                <el-menu-item-group>
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
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-row class="rowStyle" type="flex">
              <el-col
                :span="6"
                v-for="book in Lists.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )"
                :key="book.Name"
                v-show="book.Show"
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
                  <el-main style="padding-top: 0; text-align: center">
                    <el-link
                      :underline="false"
                      class="book-name"
                      @click="goToBookInfo"
                      >{{ book.Name }}</el-link
                    >
                    <p style="color: gray; margin: 0%">{{ book.Author }}</p>
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
              :total="length()"
            >
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
      activeIndex1: " ",
      activeIndex2: " ",
      currentPage: 1,
      pageSize: 8,
      Lists: [
        {
          Img: require("../assets/kuku.png"),
          Name: "书本1号",
          Author: "张三",
          ClassOne: "网络文学",
          ClassTwo: "男频",
          Price: 10,
          PubTime: 2021,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本2号",
          Author: "李四",
          ClassOne: "网络文学",
          ClassTwo: "女频",
          Price: 11,
          PubTime: 2020,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本3号",
          Author: "王五",
          ClassOne: "小说",
          ClassTwo: "中国小说",
          Price: 12,
          PubTime: 2019,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本4号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2018,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本5号",
          Author: "赵六",
          ClassOne: "教育",
          ClassTwo: "教材",
          Price: 13,
          PubTime: 2021,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本6号",
          Author: "赵六",
          ClassOne: "教育",
          ClassTwo: "教辅资料",
          Price: 13,
          PubTime: 2020,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本7号",
          Author: "赵六",
          ClassOne: "文艺",
          ClassTwo: "文学",
          Price: 13,
          PubTime: 2019,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本8号",
          Author: "赵六",
          ClassOne: "文艺",
          ClassTwo: "艺术",
          Price: 13,
          PubTime: 2018,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本9号",
          Author: "赵六",
          ClassOne: "青春/动漫",
          ClassTwo: "青春",
          Price: 13,
          PubTime: 2021,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本10号",
          Author: "赵六",
          ClassOne: "青春/动漫",
          ClassTwo: "动漫",
          Price: 13,
          PubTime: 2020,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本11号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2019,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本12号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2018,
          Show: true,
        },
        {
          Img: require("../assets/kuku.png"),
          Name: "书本13号",
          Author: "赵六",
          ClassOne: "小说",
          ClassTwo: "外国小说",
          Price: 13,
          PubTime: 2021,
          Show: true,
        },
      ],
    };
  },
  methods: {
    showAll() {
      this.activeIndex1 = " ";
      this.activeIndex2 = " ";
      this.currentPage = 1;
      for (let i = 0; i < this.Lists.length; i++) this.Lists[i].Show = true;
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
      this.activeIndex1 = "";
      /*this.Lists = this.Lists.filter(
        (item, index) => item.ClassTwo=="男频"
      );
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "男频") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }*/
    },
    NvPinFilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "女频") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    JiaoCaiFilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "教材") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    JiaoFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "教辅资料") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    ChinaFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "中国小说") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    ForeginFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "外国小说") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    LiteratureFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "文学") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    ArtFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "艺术") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    YouthFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "青春") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    CartoonFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassTwo == "动漫") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    TwoZeroTwoOneFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].PubTime == 2021) this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    TwoZeroTwoZeroFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].PubTime == 2020) this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    TwoZeroOneNineFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].PubTime == 2019) this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    TwoZeroOneEightFuilter() {
      this.activeIndex1 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].PubTime <= 2018) this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    NetworkFilter() {
      this.activeIndex2 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassOne == "网络文学") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    EducationFilter() {
      this.activeIndex2 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassOne == "教育") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    NovelFilter() {
      this.activeIndex2 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassOne == "小说") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    LandAFilter() {
      this.activeIndex2 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassOne == "文艺") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    YandCFilter() {
      this.activeIndex2 = "";
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].ClassOne == "青春/动漫") this.Lists[i].Show = true;
        else this.Lists[i].Show = false;
      }
    },
    length() {
      let temp = 0;
      for (let i = 0; i < this.Lists.length; i++) {
        if (this.Lists[i].Show == true) temp++;
      }
      return temp;
    },
  },
  created() {
    var query = this.$route.query;
    if (query) {
      var temp = query.activeIndex1;
      this.activeIndex1 = temp;
      if (temp == "1") this.NetworkFilter();
      if (temp == "2") this.EducationFilter();
      if (temp == "3") this.NovelFilter();
      if (temp == "4") this.LandAFilter();
      if (temp == "5") this.YandCFilter();
      temp = query.activeIndex2;
      this.activeIndex2 = temp;
      if (temp == "1-1") this.NanPinFilter();
      if (temp == "1-2") this.NvPinFilter();
      if (temp == "2-1") this.JiaoCaiFilter();
      if (temp == "2-2") this.JiaoFuilter();
      if (temp == "3-1") this.ChinaFuilter();
      if (temp == "3-2") this.ForeginFuilter();
      if (temp == "4-1") this.LiteratureFuilter();
      if (temp == "4-2") this.ArtFuilter();
      if (temp == "5-1") this.YouthFuilter();
      if (temp == "5-2") this.CartoonFuilter();
    }
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
  background-color: rgb(205, 92, 92);
}
.colStyle {
  text-align: center;
  font-weight: 1000;
  width: 21.93%;
  color: white;
  cursor: pointer;
}
.menu-item {
  color: rgb(188, 143, 143);
  font-weight: 1000;
}
</style>