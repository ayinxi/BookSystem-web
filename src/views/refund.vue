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
          <div class="books">
            <el-row>
              <el-col :span="19">
                <el-row
                  v-for="(books, idx) in orderDetailList.children"
                  :key="idx"
                  style="margin: 10px"
                >
                  <el-col :span="2">
                    <img :src="books.book_img" style="height: 70px" />
                  </el-col>
                  <el-col :span="12">
                    <div style="margin-right: 30px" class="book-name">
                      {{ books.book_name }}
                    </div>
                    <div class="book-detail">作者：{{ books.book_writer }}</div>
                    <div class="book-detail">
                      出版社：{{ books.book_publish }}
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div style="margin: 25px 0">
                      ¥{{ books.book_unitPrice }}
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div style="margin: 25px 0">
                      {{ books.book_num }}
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div style="margin: 25px 10px">
                      ￥{{ books.book_total }}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <el-row style="margin-top: 35px">
                  <el-col
                    class="status-name"
                    v-if="orderDetailList.status == 1"
                    style="display: flex; justify-content: center"
                    >交易成功</el-col
                  >
                  <el-col
                    class="status-name"
                    v-if="orderDetailList.status == 2"
                    style="display: flex; justify-content: center"
                    >卖家已发货</el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
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
      orderDetailList: {
        address:
          "李心玥,86-15576199089,江苏省 南京市 江宁区 秣陵街道 江宁区东南大学九龙湖校区梅园 ,000000",
        orderId: 2,
        merchant_id: 2,
        book_merchant: "新华书店网上商城自营图书",
        create_time: "2021-07-14 18:31:30",
        status: 2,
        children: [
          {
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
          {
            book_id: 22,
            book_img: require("../assets/youbenshi.jpg"),
            book_name:
              "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
            book_writer: "冯唐",
            book_publish: "东南大学出版社",
            book_unitPrice: 50,
            book_num: 1,
            book_total: 50,
          },
        ],
      },
    };
  },
  methods: {
    gotoOrder() {
      this.id = 1;
      this.$router.push("/userOrder/" + this.id);
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
.shop-name {
  font-size: 16px;
  font-weight: 600;
}
.book-name {
  font-size: 13px;
}
.status-name {
  font-size: 16px;
  color: rgb(221, 98, 98);
  font-weight: 400;
}
.action-name {
  font-size: 15px;
}
.book-detail {
  font-size: 13px;
  color: grey;
}
.books {
  background: rgb(255, 255, 255);
  color: #303133;
  /*border:1px solid rgb(201, 201, 201);*/
}
.header-card {
  height: 60px;
  margin-bottom: 10px;
}
.table-header-item {
  display: flex;
  align-items: center;
  font-size: 15px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 0px;
}
</style>