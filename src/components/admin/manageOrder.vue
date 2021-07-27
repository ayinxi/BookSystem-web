<template>
  <div class="home">
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
          :data="OrderList.filter((data) => {return data.username.includes(searchText);})"
          style="width: 100%"
          :default-sort = "{prop: 'create_time', order: 'descending'}">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.books">
                    <el-table-column prop="book_name" label="书籍名称"></el-table-column>
                    <el-table-column prop="price" label="单价(元)"></el-table-column>
                    <el-table-column prop="number" label="数量（本）"></el-table-column>
                </el-table>
                <p>总价：{{scope.row.total}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="下单时间" sortable></el-table-column>
            <el-table-column prop="username" label="买家"></el-table-column>
            <el-table-column prop="shop_name" label="卖家">
            </el-table-column>
            <el-table-column prop="state" label="订单状态"
             :filters="[
              { text: '未发货', value: '未发货' },
              { text: '已发货', value: '已发货' },
              { text: '正在申请退款', value: '正在申请退款' },
              { text: '已退款', value: '已退款' },
              { text: '已拒绝退款', value: '已拒绝退款' },
              { text: '已收货', value: '已收货' },
            ]"
            :filter-method="filterState"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="text">编辑</el-button>
                <el-button size="mini" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //模糊搜索
      searchText: "",
      OrderList:[
        {
          create_time: "2021-07-15 18:31:30",//下单时间
          username: "AB",//购买用户
          shop_name: "CD",//商家名称
          status: 2,//订单状态 1.已取消 2.未付款 3.未发货 4.已发货 5.已收货 6.评价
          total: 1000,
          books:[
            {
              book_image_b: require("../../assets/kuku.png"),//书籍图片
              book_image_s: require("../../assets/kuku.png"),//书籍图片
              book_name: "C++入门",//书籍名称
              price: 100,//书籍单价
              number: 10,//书籍数量
              repertory: 100,//库存
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