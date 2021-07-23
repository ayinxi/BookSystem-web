<template>
  <div v-loading="isLoading">
    <div>
      <div class="header">
        <el-row>
          <el-col :span="6">
            <div class="logo">
              <img
                height="70px"
                style="margin: 20px 0"
                src="../assets/jwbc.png"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="hasRole ? search1 : search2 ">
              <el-input
                placeholder="给孩子的第一本编程书籍"
                v-model="input"
                style="width:500px"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click.native="goToSearch"
                  style="
                    display: block;
                    background-color: rgb(205, 92, 92);
                    color: white;
                  "
                >
                </el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6" v-if="hasRole">
            <div style="margin-left: 20px">
              <el-row class="shopping">
                <el-col :span="10">
                  <el-badge
                    :max="99"
                    :value="goodsNum"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <el-button
                      style="
                        margin-right: 30px;
                        display: block;
                        background-color: rgb(205, 92, 92);
                        color: white;
                      "
                      size="meduim"
                      icon="el-icon-shopping-cart-2"
                      @click.native="gotoShopCar"
                      >我的购物车</el-button
                    >
                  </el-badge>
                </el-col>
                <el-col :span="10" class="pageperson">
                  <el-button
                    style="margin-left: 30px"
                    size="meduim"
                    class="pageperson"
                    icon="el-icon-s-custom"
                    @click.native="gotoPersonPage"
                    >个人主页</el-button
                  >
                </el-col>
                <el-col @click.native="loginOut" style="margin-left: 10px">
                  <i class="iconfont-tuichu" style="font-size: 20px" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" v-else>
            <div style="margin-left: 150px">
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
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-container style="margin: 0% 5%">
        <el-header style="padding: 0">
          <el-row class="rowStyle1">
            <el-col class="colStyle2" @click.native="goBackToIndex"
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
              <el-breadcrumb-item
                @click.native="test"
                style="cursor: pointer"
                >{{ this.Lists.ClassTwo }}</el-breadcrumb-item
              >
              <el-breadcrumb-item>图书名称</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
        </el-header>
        <el-container style="margin-top: 3%">
          <el-aside width="25%">
            <img class="imgStyle3" :src="this.Lists.Img" />
          </el-aside>
          <el-main
            ><el-link :underline="false" @click.native="goToShopIndex">{{
              this.Lists.shopName
            }}</el-link>
            <h2>{{ this.Lists.Name }}</h2>
            <p style="color: gray; margin: 0%">
              {{ this.Lists.Author }} {{ this.Lists.PubTime }}出版
              {{ this.Lists.press }}
            </p>
            <p>
              继《无所畏》后暌违三年，冯唐全新作品。44篇全新智慧之作+10幅金句书法+35幅私人摄影作品！你可以不屠龙，但不能不磨剑。一个人有本事才是靠得住的财富。随书附赠2张冯唐字画书签！
            </p>
            <p style="color: red; font-weight: 1000; margin: 0%">
              ￥{{ this.Lists.Price }}
            </p>
            <el-row
              :gutter="20"
              type="flex"
              style="padding: 10px 0; margin: 5% 0%"
            >
              <el-col :span="5"
                ><el-input-number v-model="num" :min="1"></el-input-number
              ></el-col>
              <el-col :span="4"
                ><el-button
                  type="primary"
                  class="el-icon-shopping-cart-2"
                  @click.native="addShoppingTrolley"
                  >加入购物车</el-button
                ></el-col
              >
              <el-col :span="4"
                ><el-button type="danger" @click.native="buy"
                  >立即购买</el-button
                ></el-col
              >
            </el-row>
          </el-main>
        </el-container>
        <div style="font-size:25px"><el-divider content-position="left"><span style="font-size:25px">用户评价</span></el-divider></div>
        <el-footer>
          <div v-for="item in evaluationList" :key="item.userName">
            <el-card style="margin:0 0 20px">
              <el-container>
              <el-aside style="width:160px;text-align:center">
                <el-image class="avatar" :src="item.userImg"></el-image>
                <p>{{ item.userName }}</p>
              </el-aside>
              <el-main>
                <el-rate
                  v-model="item.rate"
                  disabled
                  score-template="{value}"
                >
                </el-rate>
                <p>{{ item.evaluation }}</p>
              </el-main>
              </el-container>
            </el-card>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading:false,
      activeIndex1: "",
      num: 1,
      Lists: {
        shopName: "这是一家好店",
        Img: require("../assets/youbenshi.jpg"),
        Name: "有本事",
        Author: "冯唐",
        ClassOne: "网络文学",
        ClassTwo: "男频",
        Price: "10.00",
        PubTime: "2021-1-1",
        press: "东南出版社",
      },
      evaluationList: [
        {
          userName: "芜湖",
          userImg: require("../assets/avatar.jpg"),
          rate: 5,
          evaluation: "这本书真好看",
        },
        {
          userName: "胃口很挑",
          userImg: require("../assets/avatar.jpg"),
          rate: 1,
          evaluation: "太烂了",
        },
      ],
      formdata: new FormData(),
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
    gotoSign() {
      this.$router.push("/sign");
    },
    gotoLogin() {
      this.$router.push("/login");
    },
    gotoPersonPage() {
      this.$router.push("/person");
    },
    gotoShopCar() {
      this.$router.push("/shopping");
    },
    loginOut() {
      this.isLoading = true;
      this.$store.commit("clearCache");
      sessionStorage.removeItem("token");
      this.isLoading = false;
    },
    goBackToIndex() {
      this.$router.push("/");
    },
    NetworkFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "1" } });
    },
    EducationFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "2" } });
    },
    NovelFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "3" } });
    },
    LandAFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "4" } });
    },
    YandCFilter() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "5" } });
    },
    goToShopIndex() {
      this.$router.push("/shopIndex");
    },
    test() {
      this.$router.push({ path: "/classSort", query: { activeIndex2: "1-1" } });
    },
    addShoppingTrolley() {
      this.formdata.append("book_id", "1e285d4ef607f80871e946801839fc10");
      this.formdata.append("sum", this.num);
      axios({
        url: this.$store.state.yuming + "/cartitem/addCartItem",
        method: "POST",
        data: this.formdata,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "加入购物车成功",
            type: "success",
          });
          this.num = 1;
        } else {
          this.$message.error("加入购物车失败，请重试");
        }
      });
    },
    buy() {
      if (this.$store.state.token != "") {
        this.$router.push("/shopping");
      } else {
        this.$message({
          message: "请登录后再购买",
          type: "error",
        });
      }
    },
    //获取购物车中商品数量
    getGoodsNum() {
      axios({
        url: this.$store.state.yuming + "/cartitem/getNum",
        method: "GET",
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.goodsNum = data;
          } else {
            this.$message.error("获取店铺状态失败,请刷新");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
  },
  async created() {
    this.isLoading = true;
    if (this.$store.state.token) {
      await this.getGoodsNum();
    }
    //await this.getAllCategory();
    this.isLoading = false;
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
.colStyle2 {
  text-align: center;
  font-weight: 1000;
  width: 21.93%;
  color: white;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
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
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.searchButton {
  display: inline-block;
  background-color: rgb(205, 92, 92);
  color: white;
}
.search1 {
  margin: 60px 0 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search2 {
  margin: 60px 0px 60px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
