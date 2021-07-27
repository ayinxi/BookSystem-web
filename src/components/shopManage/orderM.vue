<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div class="title">店铺管理</div>
    </div>
    <div style="margin: 2% 10%">
      <el-page-header @back="goToManage" content="订单管理"></el-page-header>
    </div>
    <div style="margin: 2% 10%">
      <el-row style="margin: 0% 0% 5%">
        <el-card>
          <el-container>
            <el-aside
              style="width: 35px; padding-top: 10px; padding-bottom: 20px"
              ><div class="verticalBar1"></div
            ></el-aside>
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
            prop="create_time"
            sortable
            width="200"
            :formatter="dateFormat"
            ><!--
            :filters="[
              { text: '2021-07-08', value: '2021-07-08' },
              { text: '2021-07-09', value: '2021-07-09' },
            ]"
            :filter-method="filterDate"-->
          </el-table-column>
          <el-table-column label="用户名" width="200">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column
            label="总价"
            width="200"
            prop="total"
            sortable
            :filters="[
              { text: '0-50元', value: 50 },
              { text: '50-100元', value: 100 },
            ]"
            :filter-method="filterTotalprice"
          >
            <template slot-scope="scope">￥{{ scope.row.total }}</template>
          </el-table-column>
          <el-table-column
            label="订单状态"
            width="200"
            prop="status"
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
            <template slot-scope="scope"
              ><span v-if="scope.row.status == 1">取消订单</span
              ><span v-if="scope.row.status == 2">未付款</span>
              <span v-if="scope.row.status == 3">未发货</span>
              <span v-if="scope.row.status == 4">已发货</span>
              <span v-if="scope.row.status == 5">已收货</span>
              <span v-if="scope.row.status == 6">已评价</span></template
            >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope"
              ><el-button
                type="text"
                style="font-size: 15px"
                @click="handleInfo(scope.row.order_id)"
                >查看详情</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                style="font-size: 15px"
                @click="handleConfirm(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已评价' ||
                  scope.row.state == '已发货' ||
                  scope.row.state == '已收货'
                "
                >确认订单</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                style="font-size: 15px"
                @click="handleRefuse(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已发货' || scope.row.state == '已收货'
                "
                >取消订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align: center">
          <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="ordercount"
            layout="prev, pager, next, jumper"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <div style="margin: 0% 10% 3%">
      <el-button @click="batchConfirm" style="margin-left: 78%" type="primary"
        >批量确认订单</el-button
      >
      <el-button @click="batchRefuse" type="warning">批量取消订单</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import moment from "moment";
export default {
  data() {
    return {
      currentPage: 1,
      ordercount: 0,
      newOrder: 12345,
      isLoading: false,
      tableData: [
        {
          shop_id: "",
          total: "",
          send_time: "",
          books: [
            {
              book_image_b: "",
              book_name: "",
              number: 0,
              update_time: "",
              rate: 0,
              return_time: "",
              price: 0,
              book_image_s: "",
              press: "",
              order_book_id: "",
              transport_status: 0,
              author: "",
              remark_status: 0,
              book_id: "",
              repertory: 0,
              volume: 0,
              return_status: 0,
              remark_time: "",
              order_id: "",
              book_total_price: "",
              remark: "",
              exchange_address_id: "",
            },
          ],
          create_time: "",
          firm_time: "",
          shop_name: "",
          order_id: "",
          username: "",
          status: "",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage#reloaded");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleInfo(order_id) {
      this.$router.push(`/orderInfo/${order_id}`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //时间格式化
    dateFormat(row, column) {
      var date = row[column.property];
      return moment(date).format("YYYY-MM-DD");
    },
    //获取这个店铺的所有订单
    getOrder() {
      axios({
        url: this.$store.state.yuming + "/getOrder",
        method: "GET",
        params: {
          page_num: this.currentPage,
          order_num: 10,
          status: 1,
          identity: 1,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.tableData = data;
          } else {
            this.$message.error("获取订单失败，请刷新");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
      //获取订单数
      axios({
        url: this.$store.state.yuming + "/getOrderNum",
        method: "GET",
        params: {
          status: 1,
          identity: 1,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.ordercount = data;
          } else {
            this.$message.error("获取订单数目失败，请刷新");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    //确认订单，相当于发货
    handleConfirm(index, row) {
      this.$confirm("是否确认订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios({
          url: this.$store.state.yuming + "/shop/sendOrder",
          method: "POST",
          params: {
            order_id: row.order_id,
          },
        })
          .then((res) => {
            const { code } = res.data;
            if (code == "200") {
              this.$message.success("确认订单成功");
            } else {
              this.$message.error("确认订单失败，请刷新");
            }
          })
          .catch(() => {
            this.$message.error("出现错误，请稍后再试");
          });
      });
    },
    //取消订单
    handleRefuse(index,row) {
      this.$confirm("是否取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios({
          url: this.$store.state.yuming + "/order/cancel",
          method: "POST",
          params: {
            order_id: row.order_id,
          },
        })
          .then((res) => {
            const { code } = res.data;
            if (code == "200") {
              this.$message.success("取消订单成功");
            } else {
              this.$message.error("取消订单失败，请刷新");
            }
          })
          .catch(() => {
            this.$message.error("出现错误，请稍后再试");
          });
      });
      /*this.tableData.splice(index, 1);
      this.$message({
        type: "success",
        message: "取消成功!",
      });*/

      /* .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消",
          });
        });*/
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
    //批量确认订单
    batchConfirm() {
      this.$confirm("是否批量确认订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios({
          url: this.$store.state.yuming + "/shop/batSendOrder",
          method: "POST",
          params: {
            Order_Ids: ["asdasasdf", "afsafsdgf"],
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { indices: false });
          },
        })
          .then((res) => {
            const { code } = res.data;
            if (code == "200") {
              this.$message.success("批量确认订单成功");
            } else {
              this.$message.error("批量确认订单失败，请刷新");
            }
          })
          .catch(() => {
            this.$message.error("出现错误，请稍后再试");
          });
      });
      /*let multData = this.multipleSelection;
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
        });*/
    },
    //批量取消订单
    batchRefuse() {
      this.$confirm("是否批量取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        /*let multData = this.multipleSelection;
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
          });*/
        axios({
          url: this.$store.state.yuming + "/order/batCancel",
          method: "POST",
          params: {
            Order_Ids: ["asdasasdf", "afsafsdgf"],
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { indices: false });
          },
        })
          .then((res) => {
            const { code } = res.data;
            if (code == "200") {
              this.$message.success("批量取消订单成功");
            } else {
              this.$message.error("批量取消订单失败，请刷新");
            }
          })
          .catch(() => {
            this.$message.error("出现错误，请稍后再试");
          });
      });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getOrder();
    this.isLoading = false;
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
  right: 250px;
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
.title {
  font-size: 35px;
  padding: 30px 10px;
  position: relative;
  left: 180px;
}
</style>
