<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="toUser"
        content="我的订单"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div>
      <el-row style="margin-left: 5%">
        <el-col :span="3">
          <el-menu :default-active="orderNum" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="iconfont-dingdan1"></i>
              <span slot="title" style="margin-left: 10px">全部订单</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="iconfont-daifahuo1"></i>
              <span slot="title" style="margin-left: 10px">待发货</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="iconfont-daishouhuo1"></i>
              <span slot="title" style="margin-left: 10px">待收货</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="iconfont-xiaoxi"></i>
              <span slot="title" style="margin-left: 10px">待评价</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="iconfont-shouhou1"></i>
              <span slot="title" style="margin-left: 10px">退款</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" style="margin-left: 10px">
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in orderList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="10">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i>
                  {{ item.book_merchant }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(books, idx) in item.children"
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
                        <div class="book-detail">
                          作者：{{ books.book_writer }}
                        </div>
                        <div class="book-detail">
                          出版社：{{ books.book_publish }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">
                          ¥{{ books.book_unitPrice }}
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ books.book_num }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ books.book_total }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin: 25px 10px"
                          v-if="(books.refund_status = 1)"
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="gotoRefund(books.book_id)"
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                        <div
                          style="margin: 25px 10px"
                          v-if="(books.refund_status = 0)"
                        >
                          <el-button type="text" disabled size="mini"
                            >退款/退换货</el-button
                          >
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div
                            class="status-name"
                            v-if="item.status == 1"
                          >
                            交易成功
                          </div>
                          <div
                            class="status-name"
                            v-if="item.status == 2"
                          >
                            卖家已发货
                          </div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.orderId)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="margin-bottom: 5px">
                          <el-button
                            type="text"
                            size="mini"
                            v-if="!item.status == 1"
                            >确认收货
                          </el-button>
                        </div>
                        <div style="margin-bottom: 5px">
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoRemark(item.orderId)"
                            v-if="item.remark_status == 0"
                            >评价
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            disabled
                            v-if="item.remark_status == 1"
                            >已评价
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderNum: this.$route.params.orderId,
      orderList: [
        {
          orderId: 1,
          merchant_id: 1,
          book_merchant: "横溢图书专营店",
          create_time: "2021-07-14 18:31:30",
          status: 1,
          remark_status: 0,
          children: [
            {
              refund_status: 0,
              book_id: 11,
              book_img: require("../assets/youbenshi.jpg"),
              book_name:
                "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              book_writer: "冯唐",
              book_publish: "东南大学出版社",
              book_unitPrice: 50,
              book_num: 2,
              book_total: 100,
            },
          ],
        },
        {
          orderId: 2,
          merchant_id: 2,
          book_merchant: "新华书店网上商城自营图书",
          create_time: "2021-07-14 18:31:30",
          status: 2,
          remark_status: 1,
          children: [
            {
              refund_status: 0,
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
              refund_status: 1,
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
      ],
    };
  },
  computed: {},
  methods: {
    //返回个人主页
    toUser() {
      this.$router.push("/person");
    },
    gotoOrderDetail(e) {
      this.$router.push("/orderDetail/" + e);
    },
    gotoRefund(e) {
      this.$router.push("/refund/" + e);
    },
    gotoRemark(e) {
      this.$router.push("/remark/" + e);
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
  font-size: 10px;
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
</style>