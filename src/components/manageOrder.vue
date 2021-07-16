<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../assets/jwbc.png" />
        <div class="title">管理平台</div>
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
          <el-table
          :data="OrderList.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :default-sort = "{prop: 'buyTime', order: 'descending'}">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.bookList" :summary-method="getSummaries" show-summary>
                    <el-table-column prop="bookName" label="书籍名称"></el-table-column>
                    <el-table-column prop="bookPrice" label="单价(元)"></el-table-column>
                    <el-table-column prop="bookNum" label="数量（本）"></el-table-column>
                </el-table>
                
              </template>
            </el-table-column>
            <el-table-column prop="buyTime" label="下单时间" sortable></el-table-column>
            <el-table-column prop="userName" label="买家"></el-table-column>
            <el-table-column prop="shopName" label="卖家">
              <template slot-scope="scope">
                <el-link :href="'http://localhost:8081/'+scope.row.shopAddr">{{scope.row.shopName}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="订单状态"></el-table-column>
            <el-table-column label="操作" align="right">
              <template slot="header">
                <el-input v-model="search" size="mini" placeholder="输入买家搜索"/>
              </template>
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
      OrderList:[
        {
          buyTime: "2021-07-15 18:31:30",//购买时间
          userName: "AB",//购买用户
          shopName: "CD",//商家名称
          shopAddr: "login",//商家地址
          state: "未发货",//订单状态
          bookList:[
            {
              bookImg: require("../assets/kuku.png"),//书籍图片
              bookName: "C++入门",//书籍名称
              bookPrice: 100,//书籍单价
              bookNum: 10,//书籍数量
            },
            {
              bookImg: require("../assets/kuku.png"),//书籍图片
              bookName: "Python入门",//书籍名称
              bookPrice: 99,//书籍单价
              bookNum: 2,//书籍数量
            }
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods:{
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
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