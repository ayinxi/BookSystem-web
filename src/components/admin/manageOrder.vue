<template>
  <div class="home" v-loading="isloading">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../../assets/jwbc.png" />
        <div class="title">后台管理</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="订单管理"></el-page-header></div>
       <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以查看、查找、编辑、删除订单。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
          <el-form label-width="120px">
            <el-form-item label="买家邮箱搜索：">
              <el-input
              v-model="searchText"
              placeholder="输入买家邮箱模糊搜索"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-table
          v-loading="orderDataLoading"
          :data="orderList.filter((data) => {return data.username.includes(searchText);})"
          style="width: 100%"
          :default-sort = "{prop: 'create_time', order: 'descending'}">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.books" border>
                    <el-table-column prop="book_name" label="书籍名称"></el-table-column>
                    <el-table-column prop="price" label="单价(元)"></el-table-column>
                    <el-table-column prop="number" label="数量（本）"></el-table-column>
                    <el-table-column label="小计(元)">
                      <template slot-scope="scope">
                        <div>{{scope.row.price*scope.row.number}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="return_status" label="状态" width="210px">
                      <template slot-scope="scope">
                        <div v-if="scope.row.return_status==-1||scope.row.return_status==3
                        ||scope.row.return_status==6||scope.row.return_status==9">正常</div>
                        <div v-if="scope.row.return_status==1">
                          <el-button type="text">同意退款</el-button>
                          <el-button type="text">拒绝退款</el-button>
                        </div>
                        <div v-if="scope.row.return_status==2">正在退款</div>
                        <div v-if="scope.row.return_status==4">
                          <el-button type="text">同意换货</el-button>
                          <el-button type="text">拒绝换货</el-button>
                        </div>
                        <div v-if="scope.row.return_status==5">正在换货</div>
                        <div v-if="scope.row.return_status==7">
                          <el-button type="text">同意退货退款</el-button>
                          <el-button type="text">拒绝退货退款</el-button>
                        </div>
                        <div v-if="scope.row.return_status==8">正在退货退款</div>
                      </template>
                    </el-table-column>
                </el-table>
                <!--<p>总价：{{scope.row.total}}</p>-->
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="下单时间" sortable></el-table-column>
            <el-table-column prop="username" label="买家邮箱"></el-table-column>
            <el-table-column prop="shop_name" label="卖家名称">
            </el-table-column>
            <el-table-column prop="status" label="订单状态"
             :filters="[
              { text: '已取消', value: 1 },
              { text: '未付款', value: 2 },
              { text: '未发货', value: 3 },
              { text: '已发货', value: 4 },
              { text: '已收货', value: 5 },
              { text: '已评价', value: 6 },
            ]"
            :filter-method="filterState">
              <template slot-scope="scope">
                <div v-if="scope.row.status==1">已取消</div>
                <div v-if="scope.row.status==2">未付款</div>
                <div v-if="scope.row.status==3">未发货</div>
                <div v-if="scope.row.status==4">已发货</div>
                <div v-if="scope.row.status==5">已收货</div>
                <div v-if="scope.row.status==6">已评价</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="text">编辑</el-button>
                <el-button size="mini" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="text-align: center">
          <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="orderCount"
            layout="prev, pager, next, jumper"
          >
          </el-pagination>
        </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {},
  data() {
    return {
      //loading
      isloading: false,
      orderDataLoading: false,
      //模糊搜索
      searchText: "",
      //分页
      currentPage: 1,
      orderCount: 0,
      orderCountPerPage: 10,
      //订单
      orderList:[
        {
          create_time: "2021-07-15 18:31:30",//下单时间
          username: "AB",//购买用户
          shop_name: "CD",//商家名称
          status: 2,//订单状态 1.已取消 2.未付款 3.未发货 4.已发货 5.已收货 6.已评价
          total: 4000,
          books:[
            {
              book_image_b: require("../../assets/kuku.png"),//书籍图片
              book_image_s: require("../../assets/kuku.png"),//书籍图片
              book_name: "C++入门",//书籍名称
              price: 100,//书籍单价
              number: 10,//书籍数量
              repertory: 100,//库存
              return_status: -1,//-1.无效 1.申请退款未审核 2.同意 3.拒绝
              // 4.换货申请未审核 5.换货同意 6.换货拒绝 7.退货退款申请未审核 8.退货退款通过 9.退货退款拒绝
            },
            {
              book_image_b: require("../../assets/kuku.png"),//书籍图片
              book_image_s: require("../../assets/kuku.png"),//书籍图片
              book_name: "C++入门",//书籍名称
              price: 100,//书籍单价
              number: 10,//书籍数量
              repertory: 100,//库存
              return_status: 1,//-1.无效 1.申请退款未审核 2.同意 3.拒绝
              // 4.换货申请未审核 5.换货同意 6.换货拒绝 7.退货退款申请未审核 8.退货退款通过 9.退货退款拒绝
            },
            {
              book_image_b: require("../../assets/kuku.png"),//书籍图片
              book_image_s: require("../../assets/kuku.png"),//书籍图片
              book_name: "C++入门",//书籍名称
              price: 100,//书籍单价
              number: 10,//书籍数量
              repertory: 100,//库存
              return_status: 2,//-1.无效 1.申请退款未审核 2.同意 3.拒绝
              // 4.换货申请未审核 5.换货同意 6.换货拒绝 7.退货退款申请未审核 8.退货退款通过 9.退货退款拒绝
            },
            {
              book_image_b: require("../../assets/kuku.png"),//书籍图片
              book_image_s: require("../../assets/kuku.png"),//书籍图片
              book_name: "C++入门",//书籍名称
              price: 100,//书籍单价
              number: 10,//书籍数量
              repertory: 100,//库存
              return_status: 7,//-1.无效 1.申请退款未审核 2.同意 3.拒绝
              // 4.换货申请未审核 5.换货同意 6.换货拒绝 7.退货退款申请未审核 8.退货退款通过 9.退货退款拒绝
            },
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods:{
    //回到管理员主页
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
    //筛选订单状态
    filterState(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //重新加载订单数据
    reloadOrderData() {
      this.orderDataLoading = true;
      this.getOrderNum();
      this.getOrder();
      this.orderDataLoading = false;
    },
    //获取分页订单总数
    getOrderNum() {
      axios({
        url: this.$store.state.yuming+"/getOrderNum",
        method: "GET",
        params: {
          identity: 2,
          status: 1,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.orderCount = data;
          } else {
            this.$message.error("获取分页订单总数失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取订单分页
    getOrder() {
      axios({
        url: this.$store.state.yuming+"/getOrder",
        method: "GET",
        params: {
          page_num: this.currentPage,
          order_num: this.orderCountPerPage,
          status: 1,
          identity: 2,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.orderList = data;
          } else {
            this.$message.error("获取订单分页失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getOrderNum();
    await this.getOrder();
    this.isLoading = false;
  },
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.header{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.title{
  font-size: 35px;
  padding: 30px 10px;
}

.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box2{
  display: flex;
  justify-content: center;
}

.box-card1 {
  width: 900px;
  margin: 20px;
}

.verticalBar2 {
  width: 4px;
  height: 50px;
  background: #3d678a;
  display: inline-block;
  margin-top: 8px;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}
</style>