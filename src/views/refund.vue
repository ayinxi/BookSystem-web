<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoOrder"
        content="退款"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <el-row style="margin: 20px 15%">
      <el-card>
        <div>
          <el-row style="margin: 10px">
            <el-col :span="3">
              <img
                :src="bookList.book_img"
                style="height: 100px; width: 100px"
              />
            </el-col>
            <el-col :span="21">
              <div style="margin-right: 30px" class="book-name">
                {{ bookList.book_name }}
              </div>
              <div class="book-detail" style="margin: 10px 10px">
                作者：{{ bookList.book_writer }}
              </div>
              <div class="book-detail" style="margin: 10px 10px">
                出版社：{{ bookList.book_publish }}
              </div>
              <div class="book-total" style="margin: 10px 10px">
                ￥{{ bookList.book_total }}
              </div>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-card class="chooseCard" @click.native="firstService">
              <el-row style="margin: 20px 0">
                <el-col :span="6">
                  <i
                    class="iconfont-tuikuan"
                    style="font-size: 55px; margin-left: 10px"
                  />
                </el-col>
                <el-col :span="18">
                  <div class="title">我要退款(无需退货)</div>
                  <div class="description">
                    没收到货，或与卖家协商同意不用退货只退款
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="chooseCard" @click.native="secondService">
              <el-row style="margin: 20px 0">
                <el-col :span="6">
                  <i
                    class="iconfont-tuihuo"
                    style="font-size: 50px; margin-left: 10px"
                  />
                </el-col>
                <el-col :span="18">
                  <div class="title">我要退货退款</div>
                  <div class="description">已收到货，需要退还收到的货物</div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-card class="chooseCard" @click.native="thirdService">
              <el-row style="margin: 20px 0">
                <el-col :span="6">
                  <i
                    class="iconfont-huanhuo"
                    style="font-size: 50px; margin-left: 10px"
                  />
                </el-col>
                <el-col :span="18">
                  <div class="title">我要换货</div>
                  <div class="description">已收到货，需要更换收到的货物</div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-tooltip
              content="目前不提供商品价保服务"
              placement="bottom"
              effect="light"
            >
              <el-card class="chooseCard">
                <el-row style="margin: 20px 0">
                  <el-col :span="6">
                    <i
                      class="iconfont-jiabao"
                      style="font-size: 50px; margin-left: 10px"
                    />
                  </el-col>
                  <el-col :span="18">
                    <div class="title">价保</div>
                    <div class="description">买贵了申请价保退差额</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      bookId: this.$route.params.bookId,
      serviceId: "",
      bookList: {
        orderId: 2,
        merchant_id: 2,
        book_merchant: "新华书店网上商城自营图书",
        create_time: "2021-07-14 18:31:30",
        status: 2,
        book_id: 21,
        book_img: require("../assets/youbenshi.jpg"),
        book_name:
          "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
        book_writer: "冯唐",
        book_publish: "东南大学出版社",
        book_unitPrice: 50,
        book_num: 1,
        book_total: 50,
      },
    };
  },
  methods: {
    gotoOrder() {
      this.id = 1;
      this.$router.push("/userOrder/" + this.id);
    },
    firstService() {
      this.serviceId = 1;
      this.$router.push(`/service/${this.bookId}/${this.serviceId}`);
    },
    secondService() {
      this.serviceId = 2;
      this.$router.push(`/service/${this.bookId}/${this.serviceId}`);
    },
    thirdService() {
      this.serviceId = 3;
      this.$router.push(`/service/${this.bookId}/${this.serviceId}`);
    },
    fouthService() {
      this.serviceId = 4;
      this.$router.push(`/service/${this.bookId}/${this.serviceId}`);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.book-name {
  font-size: 13px;
}
.book-total {
  color: rgb(221, 98, 98);
}
.book-detail {
  font-size: 13px;
  color: grey;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 0px;
}
.chooseCard {
  margin: 10px 20px;
  height: 130px;
}
.title {
  font-weight: 600;
  margin-bottom: 10px;
}
.description {
  color: grey;
}
</style>