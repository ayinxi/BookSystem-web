<template>
  <div>
    <div class="bbb"></div>
    <div class="header">
      <div class="logo3">
        <img src="../assets/jwbc.png" />
      </div>
      <el-button size="medium" @click.native="goToManage"
        >返回商家管理页面</el-button
      >
    </div>
    <avue-data-rotate :option="option"></avue-data-rotate>
    <div style="margin: 3% 10% 0%">
      <el-button @click="batchConfirm" style="margin-left: 78.5%" type="danger"
        >批量确认订单</el-button
      >
      <el-button @click="batchRefuse" type="warning">批量取消订单</el-button>
    </div>
    <div style="margin: 0% 10%">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="日期"
          prop="date"
          sortable
          width="200"
          :filters="[
            { text: '2021-07-08', value: '2021-07-08' },
            { text: '2021-07-09', value: '2021-07-09' },
          ]"
          :filter-method="filterDate"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="用户名" width="200">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column
          label="总价"
          width="200"
          prop="totalprice"
          sortable
          :filters="[
            { text: '0-50元', value: 50 },
            { text: '50-100元', value: 100 },
          ]"
          :filter-method="filterTotalprice"
        >
          <template slot-scope="scope">￥{{ scope.row.totalprice }}</template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="200"
          prop="state"
          :filters="[
            { text: '未发货', value: '未发货' },
            { text: '已发货', value: '已发货' },
            { text: '正在申请退款', value: '正在申请退款' },
            { text: '已退款', value: '已退款' },
            { text: '已拒绝退款', value: '已拒绝退款' },
            { text: '已收货', value: '已收货' },
          ]"
          :filter-method="filterState"
        >
          <template slot-scope="scope">{{ scope.row.state }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope"
            ><el-button
              size="mini"
              type="primary"
              @click="handleInfo(scope.$index, scope.row)"
              >查看详情</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleConfirm(scope.$index, scope.row)"
              :disabled="
                scope.row.state == '已退款' ||
                scope.row.state == '已发货' ||
                scope.row.state == '已收货'
              "
              >确认订单</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="handleRefuse(scope.$index, scope.row)"
              :disabled="
                scope.row.state == '已退款' ||
                scope.row.state == '已发货' ||
                scope.row.state == '已收货'
              "
              >取消订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        span: 8,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: "150",
            title: "新订单",
            icon: "el-icon-warning",
            color: "rgb(49, 180, 141)",
          },
        ],
      },
      tableData: [
        {
          date: "2021-07-08",
          username: "张三",
          address: "计算机楼001",
          bookname: "书本1号",
          booknum: 5,
          bookprice: 10,
          telephone: 12345678901,
          totalprice: 50,
          state: "未发货",
        },
        {
          date: "2021-07-09",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已退款",
        },
        {
          date: "2021-07-09",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "正在申请退款",
        },
        {
          date: "2021-07-09",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已发货",
        },
        {
          date: "2021-07-09",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已退款",
        },
        {
          date: "2021-07-09",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已拒绝退款",
        },
      ],
    };
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage");
    },
    handleSelectionChange() {},
    handleInfo() {
      this.$router.push("/orderInfo");
    },
    handleConfirm() {
      this.$confirm("是否确认订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确认成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认",
          });
        });
    },
    filterDate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterTotalprice(value, row) {
      return row.totalprice <= value && row.totalprice > value - 50;
    },
    filterState(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleRefuse() {},
    batchConfirm() {},
    batchRefuse() {},
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) return "warning-row";
    },
  },
};
</script>

<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
}
.logo3 {
  display: flex;
  justify-content: center;
  height: 100px;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 306px;
}
.bbb {
  background: url("../assets/blank.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.el-table .warning-row {
  background: oldlace;
}
</style>
