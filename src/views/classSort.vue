<template>
  <div>
    <Home />
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
            <el-row class="rowStyle" type="flex">
              <el-col
                :span="6"
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
      activeIndex2: " ",
      currentPage: 1,
      pageSize: 16,
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
    };
  },
  methods: {
    showAll() {
      this.$router.push("/");
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    goToBookInfo() {
      this.$router.push("/bookInfo");
    },
    NanPinFilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "男频");
    },
    NvPinFilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "女频");
    },
    JiaoCaiFilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "教材");
    },
    JiaoFuilter() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassTwo == "教辅资料"
      );
    },
    ChinaFuilter() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassTwo == "中国小说"
      );
    },
    ForeginFuilter() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassTwo == "外国小说"
      );
    },
    LiteratureFuilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "文学");
    },
    ArtFuilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "艺术");
    },
    YouthFuilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "青春");
    },
    CartoonFuilter() {
      this.displayList = this.Lists.filter((item) => item.ClassTwo == "动漫");
    },
    TwoZeroTwoOneFuilter() {
      this.displayList = this.Lists.filter((item) => item.PubTime == 2021);
    },
    TwoZeroTwoZeroFuilter() {
      this.displayList = this.Lists.filter((item) => item.PubTime == 2020);
    },
    TwoZeroOneNineFuilter() {
      this.displayList = this.Lists.filter((item) => item.PubTime == 2019);
    },
    TwoZeroOneEightFuilter() {
      this.displayList = this.Lists.filter((item) => item.PubTime <= 2018);
    },
    NetworkFilter() {
      this.displayList = this.Lists.filter(
        (item) => item.ClassOne == "网络文学"
      );
    },
    EducationFilter() {
      this.activeIndex2 = "";
      this.displayList = this.Lists.filter((item) => item.ClassOne == "教育");
    },
    NovelFilter() {
      this.activeIndex2 = "";
      this.displayList = this.Lists.filter((item) => item.ClassOne == "小说");
    },
    LandAFilter() {
      this.activeIndex2 = "";
      this.displayList = this.Lists.filter((item) => item.ClassOne == "文艺");
    },
    YandCFilter() {
      this.activeIndex2 = "";
      this.displayList = this.Lists.filter(
        (item) => item.ClassOne == "青春/动漫"
      );
    },
  },
  created() {
    var query = this.$route.query;
    if (query) {
      var temp = query.activeIndex2;
      this.activeIndex2 = temp;
      if (temp == "1") this.NetworkFilter();
      if (temp == "2") this.EducationFilter();
      if (temp == "3") this.NovelFilter();
      if (temp == "4") this.LandAFilter();
      if (temp == "5") this.YandCFilter();
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
</style>