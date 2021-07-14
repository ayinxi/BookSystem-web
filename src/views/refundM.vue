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
    <div style="margin: 3% 10% 0%">
      <el-button @click="batchConfirm" style="margin-left: 78.5%"
        >批量同意退款</el-button
      >
      <el-button @click="batchRefuse">批量拒绝退款</el-button>
    </div>
    <div style="margin: 0% 10%">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="200">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="用户名" width="200">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="总价" width="200">
          <template slot-scope="scope">{{
            scope.row.totalprice
          }}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="200" >
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
                scope.row.state == '已拒绝退款' ||
                scope.row.state == '已收货'
              "
              >同意退款</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="handleRefuse(scope.$index, scope.row)"
              :disabled="
                scope.row.state == '已退款' ||
                scope.row.state == '已拒绝退款' ||
                scope.row.state == '已收货'
              "
              >拒绝退款</el-button
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
      tableData: [
        {
          date: "2021-7-8",
          username: "张三",
          address: "计算机楼001",
          bookname: "书本1号",
          booknum: 5,
          bookprice: 10,
          telephone: 12345678901,
          totalprice: 50,
          state: "未退款",
        },
        {
          date: "2021-7-9",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已退款",
        },
      ],
    };
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage");
    },
    handleInfo() {
      this.$router.push("/refundInfo");
    },
    handleConfirm() {
      this.$confirm("是否同意退款?", "提示", {
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
  right:306px;
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
</style>
