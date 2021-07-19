<template>
  <div>
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <el-button size="medium" @click.native="goToManage" type="danger" plain
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 2% 18%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span>
              <p style="font-weight: 1000">
                您可以在本页面进行订单管理，包括: 查看订单详情 确认订单 取消订单
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
    </div>
    <div style="margin: 1.5% 10%">
      <el-card>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
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
                type="text"
                @click="handleInfo(scope.$index, scope.row)"
                >查看详情</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                size="mini"
                type="text"
                @click="handleConfirm(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已退款' ||
                  scope.row.state == '已发货' ||
                  scope.row.state == '已收货'
                "
                >确认订单</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                size="mini"
                type="text"
                @click="handleRefuse(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已发货' || scope.row.state == '已收货'
                "
                >取消订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="margin: 0% 10% 3%">
      <el-button @click="batchConfirm" style="margin-left: 78%" type="danger"
        >批量确认订单</el-button
      >
      <el-button @click="batchRefuse" type="warning">批量取消订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newOrder: 12345,
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
          state: "已收货",
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
      multipleSelection: [],
    };
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleInfo() {
      this.$router.push("/orderInfo");
    },
    handleConfirm(index, row) {
      this.$confirm("是否确认订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.state = "已发货";
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
    handleRefuse(index) {
      this.$confirm("是否取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "取消成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消",
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
    batchConfirm() {
      this.$confirm("是否批量确认订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let multData = this.multipleSelection;
          let tableData1 = this.tableData;
          let multDataLen = multData.length;
          let tableDataLen = tableData1.length;
          for (let i = 0; i < multDataLen; i++) {
            for (let y = 0; y < tableDataLen; y++) {
              if (
                JSON.stringify(tableData1[y]) == JSON.stringify(multData[i]) &&
                tableData1[y].state != "已发货" &&
                tableData1[y].state != "已收货" &&
                tableData1[y].state != "已退款"
              ) {
                //判断是否相等，相等就更改状态
                this.tableData[y].state = "已发货";
              }
            }
          }
          this.$message({
            type: "success",
            message: "批量确认成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃批量确认",
          });
        });
    },
    batchRefuse() {
      this.$confirm("是否批量取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let multData = this.multipleSelection;
          let tableData1 = this.tableData;
          let multDataLen = multData.length;
          let tableDataLen = tableData1.length;
          for (let i = 0; i < multDataLen; i++) {
            for (let y = 0; y < tableDataLen; y++) {
              if (
                JSON.stringify(tableData1[y]) == JSON.stringify(multData[i])
              ) {
                //判断是否相等，相等就删除
                this.tableData.splice(y, 1);
              }
            }
          }
          this.$message({
            type: "success",
            message: "批量取消成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃批量取消",
          });
        });
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
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 306px;
}
.el-table .warning-row {
  background: oldlace;
}
.verticalBar1 {
  width: 3px;
  height: 100%;
  background: rgb(60, 59, 105);
  display: inline-block;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}
</style>
