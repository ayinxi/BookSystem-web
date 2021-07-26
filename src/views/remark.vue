<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoOrder"
        content="评价"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <el-row style="margin: 20px 15%">
      <el-card>
        <div>
          <div class="books">
            <el-row>
              <el-col :span="24">
                <el-row
                  style="margin: 10px"
                >
                  <el-col :span="4">
                    <img :src="bookList.book_img" style="height: 150px" />
                  </el-col>
                  <el-col :span="20">
                    <div style="margin-right: 30px" class="book-name">
                      {{ bookList.book_name }}
                    </div>
                    <div class="book-detail" style="margin-top: 15px">
                      作者：{{ bookList.book_writer }}
                    </div>
                    <div class="book-detail">
                      出版社：{{ bookList.book_publish }}
                    </div>
                    <div style="margin: 20px 0px" class="book-total">
                      ￥{{ bookList.book_total }}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <el-form
            ref="remarkList"
            :model="remarkList"
            label-width="100px"
            :rules="remarkRules"
          >
            <el-form-item label="总体评分：" prop="rate">
              <div style="margin-top: 10px">
                <el-rate v-model="remarkList.rate" :colors="colors" show-text>
                </el-rate>
              </div>
            </el-form-item>
            <el-form-item label="详细评价：">
              <el-input
                type="textarea"
                maxlength="100"
                show-word-limit
                clearable
                style="width: 500px"
                rows="5"
                v-model="remarkList.description"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>提交</el-button>
            </el-form-item>
          </el-form>
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
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      remarkRules: {
        rate: [
          { required: true, message: "请对此次订单评分", trigger: "blur" },
        ],
      },
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
      remarkList: {
        rate: "",
        description: "",
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
  font-size: 18px;
}
.book-detail {
  font-size: 15px;
  color: grey;
}
.books {
  background: rgb(255, 255, 255);
  color: #303133;
  /*border:1px solid rgb(201, 201, 201);*/
}
.book-total {
  color: rgb(221, 98, 98);
}
</style>