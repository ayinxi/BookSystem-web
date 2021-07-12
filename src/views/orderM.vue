<template>
  <div>
    <div class="header">
       <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
      <el-button size="medium" @click.native="goToManage"
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 5% 10%">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="240">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="用户名" width="240">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="总价" width="240">
          <template slot-scope="scope">{{
            scope.row.booknum * scope.row.bookprice
          }}</template>
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
              >确认订单</el-button
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
        },
      ],
    };
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage")
    },
    handleSelectionChange() {},
    handleInfo() {
    this.$router.push('/orderInfo');
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
  },
};
</script>

<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
