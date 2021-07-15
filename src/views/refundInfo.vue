<template>
  <div>
    <div class="header2">
      <div class="logo2">
        <img width="250px" src="../assets/jwbc.png" />
      </div>
    </div>
    <div style="margin: 0% 5%">
      <el-form ref="tablData" :model="tableData" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单日期：" prop="date">
              <span>{{ tableData.date }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户名称：" prop="username">
              <span>{{ tableData.username }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收货人名称：" prop="bookname">
              <span>{{ tableData.consigneeName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人地址：" prop="address">
              <span>{{ tableData.address }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人电话：" prop="telephone">
              <span>{{ tableData.telephone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="申请退款理由：" prop="reason">
            <span>{{ tableData.reason }}</span>
          </el-form-item>
        </el-row>
        <el-form-item label-width="0">
          <el-table :data="tableData.bookList" border style="width: 100%">
            <el-table-column label="图书图片" width="180">
              <template slot-scope="scope">
                <img :src="scope.row.bookimg" class="imgStyle" />
              </template>
            </el-table-column>
            <el-table-column label="图书名称" width="180" prop="bookname">
            </el-table-column>
            <el-table-column prop="booknum" label="图书数量" width="180">
            </el-table-column>
            <el-table-column prop="bookprice" label="图书单价" width="180">
              <template slot-scope="scope"
                >￥{{ scope.row.bookprice }}</template
              >
            </el-table-column>
            <el-table-column prop="totalprice" label="总价">
              <template slot-scope="scope">{{
                scope.row.totalprice
              }}</template></el-table-column
            >
          </el-table>
        </el-form-item>
        <el-form-item align="center" label-width="0">
          <el-button type="primary" @click="returnToM">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        date: "2021-7-8",
        username: "张三",
        consigneeName: "李四",
        address: "计算机楼001",
        telephone: 12345678901,
        reason: "这是退款理由这是退款理由",
        bookList: [
          {
            bookname: "书本1号",
            booknum: 5,
            bookprice: 10,
            totalprice: 50,
            bookimg: require("../assets/kuku.png"),
          },
          {
            bookname: "书本2号",
            booknum: 6,
            bookprice: 11,
            totalprice: 66,
            bookimg: require("../assets/kuku.png"),
          },
        ],
      },
    };
  },
  methods: {
    returnToM() {
      this.$router.push("/refundM");
    },
  },
};
</script>

<style acoped>
.header2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.logo2 {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.imgStyle {
  width: 200px;
  height: 200px;
}
</style>